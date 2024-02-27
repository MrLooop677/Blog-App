import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNewPost,
  deletePost,
  editPost,
  getAllPosts,
  getAllUsers,
  getDetailPost,
  searchPost,
} from "../../services/apis/posts";

export const getPosts = createAsyncThunk(
  "post/getPost",
  async (numPage, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await getAllPosts(numPage);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getUsers = createAsyncThunk(
  "post/getUsers",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const usersMap = {};
      const userRes = await getAllUsers();
      const users = userRes?.data;
      users.forEach((user) => {
        usersMap[user?.id] = user;
      });
      return usersMap;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await getDetailPost(id);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPosts = createAsyncThunk(
  "post/addPosts",
  async (post, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await createNewPost(post);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editPosts = createAsyncThunk(
  "post/editPost",
  async (post, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await editPost(post);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deletePosts = createAsyncThunk(
  "post/deletePost",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await deletePost(id);
      return res?.data?.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const searchPosts = createAsyncThunk(
  "post/searchPosts",
  async (word, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await searchPost(word);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
let initialState = {
  record: [],
  users: [],
  singleRecord: {},
  loader: false,
  error: null,
  paginate: {
    pages: 0,
  },
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    const pendingHandler = (state) => {
      state.loader = true;
    };

    const rejectedHandler = (state, action) => {
      state.loader = false;
      state.error = action.payload;
    };

    //get posts
    builder.addCase(getPosts.pending, pendingHandler);
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loader = false;
      state.record = action.payload.data;
      state.paginate.pages = action.payload.pages;
    });
    builder.addCase(getPosts.rejected, rejectedHandler);

    //get all users
    builder.addCase(getUsers.pending, pendingHandler);
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loader = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, rejectedHandler);

    //get post
    builder.addCase(getSinglePost.pending, pendingHandler);
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loader = false;
      state.singleRecord = action.payload;
    });
    builder.addCase(getSinglePost.rejected, rejectedHandler);

    //add posts
    builder.addCase(addPosts.pending, pendingHandler);
    builder.addCase(addPosts.fulfilled, (state, action) => {
      state.loader = false;
      state.record = [...state?.record, action.payload];
    });
    builder.addCase(addPosts.rejected, rejectedHandler);

    // edit posts
    builder.addCase(editPosts.pending, pendingHandler);
    builder.addCase(editPosts.fulfilled, (state, action) => {
      state.loader = false;
      const newData = action.payload;

      state.record = state.record.map((item) => {
        if (item.id === newData.id) {
          return newData;
        }
        return item;
      });
    });
    builder.addCase(editPosts.rejected, rejectedHandler);

    //delete posts
    builder.addCase(deletePosts.pending, pendingHandler);
    builder.addCase(deletePosts.fulfilled, (state, action) => {
      state.loader = false;
      state.record = state?.record?.filter(
        (item) => item?.id !== action?.payload
      );
    });
    builder.addCase(deletePosts.rejected, rejectedHandler);

    //search posts
    builder.addCase(searchPosts.pending, pendingHandler);
    builder.addCase(searchPosts.fulfilled, (state, action) => {
      state.loader = false;
      state.record = action.payload;
    });
    builder.addCase(searchPosts.rejected, rejectedHandler);
  },
});

export default postSlice.reducer;
