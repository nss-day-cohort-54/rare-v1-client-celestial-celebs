


export const AuthorList = ({author, users, updateAuthorId}) => {
    
    return (
        <>
            <select
                className="category_dropdown"
                name="user_id"
                value={author}
                onChange={updateAuthorId}
            >
                <option name="category_id" value="0">
                    Select an author
                </option>
                {users?.map((user, index) => {
                    return (
                        <option key={index} name="user_id" value={user.id}>
                            {user.first_name} {user.last_name}

                        </option>
                    );
                })}
            </select>
        </>
    )
}