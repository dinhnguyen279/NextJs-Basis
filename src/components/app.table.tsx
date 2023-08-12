"use client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ModalCreate from "./create.modal";

interface IProps {
  blogs: IBlogs[];
}

const FormTable = (props: IProps) => {
  const { blogs } = props;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  return (
    <>
      <div className="flex justify-between w-full items-center mb-3">
        <h1>Blogs Daniel</h1>
        <div>
          <Button
            onClick={() => {
              setShowModalCreate(true);
            }}
            variant="secondary"
          >
            Add New
          </Button>
        </div>
      </div>
      <Table hover bordered size="md">
        <thead>
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((val) => {
            return (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.title}</td>
                <td>{val.author}</td>
                <td className="flex gap-x-4">
                  <Button className="basis-1/3" variant="primary">
                    View
                  </Button>
                  <Button className="basis-1/3" variant="success">
                    Edit
                  </Button>
                  <Button className="basis-1/3" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ModalCreate
        setShowModalCreate={setShowModalCreate}
        showModalCreate={showModalCreate}
      />
    </>
  );
};

export default FormTable;
