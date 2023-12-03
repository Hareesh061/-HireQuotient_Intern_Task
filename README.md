# This is my Internship Task, given by HireQuotient Team.

About: This code is a React component (App) that creates an admin dashboard to manage user data. It utilizes React Bootstrap for styling and includes features such as pagination, search functionality, bulk deletion, row selection, row deletion, and row editing.

# Link: https://benevolent-cannoli-4abeba.netlify.app
Note: (I am done how much possible in the given time line.)

As part of the task I need to complete any one Assignment/Task based on my interests.

I choose the assignment 2, which is more on web-app frontend development:

The key points of the code are given below:

**Key Features:**

1. **Fetching Data:** The `useEffect` hook is used to fetch user data from an API (https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json) when the component mounts. The retrieved data is stored in the `users` state.

2. **Pagination:** The displayed users are paginated to show only a certain number of users per page (`usersPerPage`). Users can navigate between pages using the pagination buttons.

3. **Search Functionality:** Users can search for specific users by typing in the search bar. The displayed users are filtered based on the search term (`searchTerm`).

4. **Row Selection:** Each user row has a checkbox, allowing the user to select individual rows. The selected rows are highlighted, and the number of selected rows is displayed.

5. **Select All:** There is an option to select all rows with a single checkbox. The `selectAll` state keeps track of whether all rows are selected or not.

6. **Bulk Deletion:** There is a "Delete All" button that deletes all the selected rows. The user is prompted for confirmation before deletion.

7. **Row Deletion:** Each row has a delete button (`FaTrash`) that allows the user to delete the corresponding user. Again, confirmation is requested before deletion.

8. **Row Editing:** Each row has an edit button (`FaEdit`). Clicking on this button prompts the user to enter new information for the user (name, email, and role). The user information is then updated with the new data.

9. **UI Elements:** The UI is structured with a top bar containing a search bar and a "Delete All" button. The user data is displayed in a table with checkboxes, user details, and action buttons. Pagination buttons, selected row count, and current page information are also displayed.

10. **React Bootstrap:** The code utilizes the React Bootstrap library for styling and UI components, such as `Table`, `InputGroup`, `FormControl`, `Button`, and `Form.Check`.

    **Fig: Admin Dashboard**



    <img width="956" alt="image" src="https://github.com/Hareesh061/-HireQuotient_Intern_Task/assets/90563881/b8fd72d9-d3e3-4dae-a5aa-293a7b8575d8">


Overall, this code provides a user-friendly interface for managing and interacting with a list of users, offering features for searching, editing, and deleting user records.



**Keep Learning**
