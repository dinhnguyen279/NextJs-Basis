"use client";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

function ModalCreate(props: IProps) {
  const { setShowModalCreate, showModalCreate } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleClose = () => {
    setShowModalCreate(false);
    setTitle("");
    setAuthor("");
    setContent("");
  };
  const handleOnSubmit = async () => {
    if (!title) {
      toast.warning("Vui lòng nhập tiêu đề bài viết");
      return;
    }
    if (!author) {
      toast.warning("Vui lòng nhập tên tác giả");
      return;
    }
    if (!content) {
      toast.warning("Vui lòng nhập nội dung blogs");
      return;
    }
    await fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Create success");
          setShowModalCreate(false);
          // Reload data
          mutate("http://localhost:8000/blogs");
          console.log("data", data);
        } else {
          toast.error("Create error");
          return;
        }
      })
      .catch((err) => {
        toast.error("Server error");
      });
  };
  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Blogs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter your title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                placeholder="Enter your author"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                rows={3}
                placeholder="Enter your content"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleOnSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreate;
