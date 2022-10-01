const usersReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE": {
      const admin = action.adminData.docs[0].data();
      console.log("Loaded");
      return {
        ...state,
        users: action.data,
        adminCredentials: {
          password: admin.password,
          adminWalletKey: admin.walletKey,
          email: admin.email,
          id: action.adminData.docs[0].id,
        },
      };
    }

    case "ADD_USER": {
      const updatedUsers = [action.newUser, ...state.users];
      return {
        ...state,
        users: updatedUsers,
      };
    }

    case "EDIT_USER": {
      const updatedUsers = state.users;
      const index = updatedUsers.findIndex(
        (user) => user.id === action.updatedUser.id
      );
      updatedUsers[index] = action.updatedUser;
      return {
        ...state,
        user: updatedUsers,
      };
    }

    case "DELETE_USER": {
      const updatedUsers = state.users.filter((user) => user.id !== action.id);
      return {
        ...state,
        users: updatedUsers,
      };
    }

    case "UPDATE_ADMIN_PASSWORD": {
      const updateCredentials = state.adminCredentials;
      updateCredentials.password = action.newPassword;
      return {
        ...state,
        adminCredentials: updateCredentials,
      };
    }

    case "UPDATE_ADMIN_WalletKey": {
      const updateCredentials = state.adminCredentials;
      updateCredentials.adminWalletKey = action.newWalletKey;
      return {
        ...state,
        adminCredentials: updateCredentials,
      };
    }

    default: {
      return state;
    }
  }
};

export default usersReducer;
