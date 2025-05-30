import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/UserAPI";
import AdminLayout from "../layout/AdminLayout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";

const Update_User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetUserDetailsQuery(params?.id);
  const [updateUser, { error, isLoading, isSuccess }] = useUpdateUserMutation();

  console.log(data);
  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("User updated");
      navigate("/admin/users");
    }
  }, [error, isSuccess]);

  //handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    const userData = { name, email, role };
    updateUser({ id: params?.id, body: userData });
  };

  return (
    <>
      <MetaData title={"Update User"} />
      <AdminLayout>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-10 col-lg-8">
            <form className="shadow-lg p-4" onSubmit={handleUpdate}>
              <h2 className="mb-4">Update User</h2>

              <div className="mb-3">
                <label for="name_field" className="form-label">
                  Name
                </label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label for="email_field" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label for="role_field" className="form-label">
                  Role
                </label>
                <select
                  id="role_field"
                  className="form-select"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-success update-btn w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? "Updating" : "Update"}
              </button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Update_User;
