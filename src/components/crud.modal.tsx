"use client";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface IProps {
  showModalCRUD: boolean;
  setShowModalCRUD: (value: boolean) => void;
  titleModal: string;
  blog: IBlogs | null;
  setBlog: (value: IBlogs | null) => void;
}

function ModalCRUD(props: IProps) {
  const { setShowModalCRUD, showModalCRUD, titleModal, blog, setBlog } = props;

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog]);

  const handleCreateBlog = async () => {
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
          setShowModalCRUD(false);
          // Reload data
          mutate("http://localhost:8000/blogs");
        } else {
          toast.error("Create error");
          return;
        }
      })
      .catch((err) => {
        toast.error("Server Create error");
      });
  };

  const handleUpdateBlog = async () => {
    await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.warning("Update success");
          setBlog(null);
          setShowModalCRUD(false);
          // Reload data
          mutate("http://localhost:8000/blogs");
        } else {
          toast.error("Update error");
          return;
        }
      })
      .catch((err) => {
        toast.error("Server Update error");
      });
  };

  const handleDeleteBlog = async () => {
    await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Delete success");
          setBlog(null);
          setShowModalCRUD(false);
          // Reload data
          mutate("http://localhost:8000/blogs");
        } else {
          toast.error("Delete error");
          return;
        }
      })
      .catch((err) => {
        toast.error("Server Delete error");
      });
  };

  const handleClose = () => {
    setShowModalCRUD(false);
    setTitle("");
    setAuthor("");
    setContent("");
    setBlog(null);
  };
  return (
    <>
      <Modal
        show={showModalCRUD}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{titleModal} blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {titleModal === "Delete" ? (
            <div>Chắc chưa, chắc muốn xóa không?</div>
          ) : (
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
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>

          {titleModal === "Create" && (
            <Button variant="primary" onClick={() => handleCreateBlog()}>
              Save
            </Button>
          )}

          {titleModal === "Update" && (
            <Button variant="warning" onClick={() => handleUpdateBlog()}>
              Update
            </Button>
          )}

          {titleModal === "Delete" && (
            <Button variant="danger" onClick={() => handleDeleteBlog()}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCRUD;
