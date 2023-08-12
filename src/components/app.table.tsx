"use client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ModalCRUD from "./crud.modal";
import Link from "next/link";

interface IProps {
  blogs: IBlogs[];
}

const FormTable = (props: IProps) => {
  const { blogs } = props;
  const [showModalCRUD, setShowModalCRUD] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>("");
  const [blog, setBlog] = useState<IBlogs | null>(null);
  return (
    <>
      <div className="flex justify-between w-full items-center mb-3">
        <h1>Blogs Daniel</h1>
        <div>
          <Button
            onClick={() => {
              setShowModalCRUD(true);
              setTitleModal("Create");
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
                <td className="flex sm:flex-row flex-col gap-4 h-full">
                  <Button className="basis-1/3" variant="primary">
                    <Link href={`/blogs/${val.id}`} className="nav-link">
                      View
                    </Link>
                  </Button>
                  <Button
                    onClick={() => {
                      setBlog(val);
                      setShowModalCRUD(true);
                      setTitleModal("Update");
                    }}
                    className="basis-1/3"
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setBlog(val);
                      setShowModalCRUD(true);
                      setTitleModal("Delete");
                    }}
                    className="basis-1/3"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ModalCRUD
        titleModal={titleModal}
        blog={blog}
        setBlog={setBlog}
        setShowModalCRUD={setShowModalCRUD}
        showModalCRUD={showModalCRUD}
      />
    </>
  );
};

export default FormTable;
