import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../data/actions";
import Loader from "../loader/Loader";

export const Profiles = () => {
  const accounts = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    accounts && setAdmin(accounts.find((e) => e.role === 1));
  }, [accounts]);

  return (
    <div className="container-center">
      <div className="container dashboard-Admin">
        {accounts ? (
          <div className="bg-light mt-5 pt-2 rounded">
            <span className="h4">Admin</span>
            {admin && (
              <table className="table table-striped table-hover table-bordered mb-3 align-middle">
                <thead>
                  <tr className="table-light">
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{admin._id.substring(7, 14)}</td>
                    <td>{admin.name}</td>
                    <td>{admin.lastname}</td>
                    <td>{admin.email}</td>
                  </tr>
                </tbody>
              </table>
            )}
            <div className="border-top border-3 border-dark mb-2"></div>
            <span className="h4">Usuarios</span>
            {accounts && (
              <table className="table table-striped table-bordered ">
                <thead>
                  <tr className="table-light">
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {accounts
                    .filter((e) => e.role === 0)
                    .map((account) => (
                      <tr key={account._id}>
                        <td>{account._id.substring(7, 14)}</td>
                        <td>{account.name}</td>
                        <td>{account.lastname}</td>
                        <td>{account.email}</td>
                        <td>
                          <button
                            className="btn bg-danger me-2"
                            onClick={() => {
                              dispatch();
                            }}
                          >
                            Eliminar usuario
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
