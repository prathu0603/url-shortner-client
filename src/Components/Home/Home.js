import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import "./home.css";

const Home = () => {
  let i = 1;
  const history = useHistory();
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [tableData, setTableData] = useState([]);

  const callHome = async () => {
    try {
      const res = await fetch(
        "https://url-shortner-server-1.herokuapp.com/api/url/home",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      setTableData(data);

      if (!(res.status === 200)) {
        console.log("no user");
        history.push("/signin");
      }
    } catch (error) {
      console.log("Server Error");
      history.push("/signin");
    }
  };

  useEffect(() => {
    callHome();
  }, []);

  console.log(tableData._id);

  const GenerateUrl = async (e) => {
    e.preventDefault();
    // Get User Id From Cookies
    // const id = Cookies.get("id").split(":")[1].replace(/['"]+/g, "");
    const id = tableData._id;

    // console.log(tableData._id);
    if (!longUrl) {
      toast.warn("Fill the Url", {
        position: "top-right",
      });
    } else {
      const res = await fetch(
        "https://url-shortner-server-1.herokuapp.com/api/url/shorten",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ longUrl, id }),
        }
      );

      const data = await res.json();

      setShortUrl(data.shortUrl);

      if (res.status === 401) {
        toast.dark("Invalid URL", {
          position: "top-right",
        });
      } else if (res.status === 500) {
        window.alert("Server ERROR");
      } else if (res.status == 200) {
        toast.success("Short URL Created", {
          position: "top-right",
        });
      } else window.alert("Serious Error");
    }
  };

  const Logout = (e) => {
    Cookies.remove("jwtToken");
    Cookies.remove("id");
    history.push("/signin");
  };
  return (
    <div className="homePage">
      <div className="d-flex justify-content-end">
        <button className="m-3 logoutButton " onClick={Logout}>
          Logout
        </button>
      </div>
      <Container>
        <Form>
          <h3>URL Shortner</h3>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="Enter Long URL"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit" onClick={GenerateUrl}>
                Generate Short URL
              </Button>
            </Col>
          </Row>
          <br />

          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={shortUrl}
                  placeholder="Short Url"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  toast.dark("Text Copied", {
                    position: "top-right",
                  });
                }}
              >
                Copy
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <div className="mt-5">
        <br />
        {tableData.urlData ? (
          <>
            {tableData.urlData.length === 0 ? (
              <h3>Try To Convert Some Long Url</h3>
            ) : (
              <>
                <h2>Your Logs....</h2>

                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th> `:` </th>
                      <th>Date</th>
                      <th>Short Url</th>
                      <th>Long Url </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.urlData.map(
                      ({ _id, date, longUrl, shortUrl }) => (
                        <tr key={_id}>
                          <td>{i}</td>
                          <td>{date}</td>
                          <td>{shortUrl}</td>
                          <td>{longUrl}</td>
                          {(i = i + 1)}
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </>
            )}
          </>
        ) : (
          ""
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
