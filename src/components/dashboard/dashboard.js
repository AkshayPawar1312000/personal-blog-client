import React, { useState, useEffect } from "react";
import "./dashboard.css";
import userImg from "../../image/userImg.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import Stack from "@mui/material/Stack";
import Navbar from "../navbar/navbar";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { allBlogs, deleteBlog, getBlog } from "../../store/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#001f3f",
  color: theme.palette.common.white,
  padding: "4px 8px",
  fontSize: "medium",
  borderRadius: 4,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: "30px",
}));

const SmallTableCell = styled(TableCell)(({ theme }) => ({
  padding: "4px 8px",
  fontSize: "medium",
}));

const ActionIcons = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "medium",
  padding: "4px",
}));

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const blogs = useSelector((state) => state?.blog.allBlogs);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [blogSearchOpen, setBlogSearchOpen] = useState(false);
  const [authorSearchOpen, setAuthorSearchOpen] = useState(false);
  const [seachedBlog, setSeachedBlog] = useState("");
  const [seachedAuthor, setSeachedAuthor] = useState("");
  const [personalAllBlogs, setPersonalAllBlogs] = useState([]);
  const [prsonalFilterData, setPrsonalFilterData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateBlogButton = () => {
    navigate("/createBlog");
  };

  const handleLogOutButton = () => {
    navigate("/userRegistration");
  };

  const handleReadBlog = (id) => {
    const page = "blogPage";
    dispatch(getBlog(id, navigate, page));
  };

  const handleEditBlogButton = (id) => {
    const page = "editPage";
    dispatch(getBlog(id, navigate, page));
  };
  const handleDeleteBlogButton = (id) => {
    dispatch(deleteBlog(id, navigate));
  };
  const handleBlogSearchIconClick = () => {
    setBlogSearchOpen((prev) => !prev);
  };
  const handleAuthorSearchIconClick = () => {
    setAuthorSearchOpen((prev) => !prev);
  };

  // Filter function
  const searchedFilter = (searchBlog, searchAuthor) => {
    setSeachedBlog(searchBlog);
    setSeachedAuthor(searchAuthor);
    const filteredData = personalAllBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchBlog.toLowerCase()) &&
        blog.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    setPrsonalFilterData(filteredData);
    setPage(0);
  };

  useEffect(() => {
    dispatch(allBlogs());
  }, []);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setPersonalAllBlogs(blogs);
      setPrsonalFilterData(blogs);
    }
  }, [blogs]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <img src={userImg} className="img"></img>
        </div>
        <div className="admin-info">
          <h2>{user?.name}</h2>
          <p className="sub-info">Full stack developer</p>
          <p className="sub-info">{user?.email}</p>
          <p className="sub-info">Total Blogs - {blogs ? blogs.length : 0}</p>
          <Stack direction="row" spacing={2}>
            <Button
              size="small"
              variant="contained"
              endIcon={<CreateIcon />}
              sx={{
                backgroundColor: "#071952",
                "&:hover": {
                  backgroundColor: "#06173f",
                },
              }}
              onClick={handleCreateBlogButton}
            >
              Create Blog
            </Button>
            <Button
              size="small"
              variant="contained"
              endIcon={<LogoutIcon />}
              sx={{
                backgroundColor: "#071952",
                "&:hover": {
                  backgroundColor: "#06173f",
                },
              }}
              onClick={handleLogOutButton}
            >
              Add new user
            </Button>
          </Stack>
        </div>
      </div>
      <div className="table-container">
        <div className="blog-table">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableHeaderCell sx={{ width: "10%" }}>
                    Sr. No
                  </StyledTableHeaderCell>
                  <StyledTableHeaderCell sx={{ width: "40%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>Blog Name</span>
                      {blogSearchOpen ? (
                        <input
                          type="text"
                          className="small-text-field"
                          placeholder="Search Blog"
                          onChange={(e) =>
                            searchedFilter(e.target.value, seachedAuthor)
                          }
                        />
                      ) : (
                        <IconButton
                          size="small"
                          style={{ color: "white" }}
                          onClick={handleBlogSearchIconClick}
                        >
                          <SearchIcon style={{ fontSize: 20 }} />
                        </IconButton>
                      )}
                    </div>
                  </StyledTableHeaderCell>

                  <StyledTableHeaderCell sx={{ width: "25%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>Author Name</span>
                      {authorSearchOpen ? (
                        <input
                          type="text"
                          className="small-text-field"
                          placeholder="Search Author"
                          onChange={(e) =>
                            searchedFilter(seachedBlog, e.target.value)
                          }
                        />
                      ) : (
                        <IconButton
                          size="small"
                          style={{ color: "white" }}
                          onClick={handleAuthorSearchIconClick}
                        >
                          <SearchIcon style={{ fontSize: 20 }} />
                        </IconButton>
                      )}
                    </div>
                  </StyledTableHeaderCell>

                  <StyledTableHeaderCell align="center" sx={{ width: "10%" }}>
                    Action
                  </StyledTableHeaderCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {prsonalFilterData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <SmallTableCell>{index + 1}</SmallTableCell>
                      <SmallTableCell>
                        {row.title}
                        <Tooltip
                          title="Read"
                          onClick={() => {
                            handleReadBlog(row.id);
                          }}
                        >
                          <ActionIcons>
                            <UnfoldMoreIcon fontSize="small" />
                          </ActionIcons>
                        </Tooltip>
                      </SmallTableCell>
                      <SmallTableCell>{row.author}</SmallTableCell>
                      <SmallTableCell align="center">
                        <Tooltip
                          title="Edit"
                          onClick={() => {
                            handleEditBlogButton(row.id);
                          }}
                        >
                          <ActionIcons>
                            <EditIcon fontSize="small" />
                          </ActionIcons>
                        </Tooltip>
                        <Tooltip
                          title="Delete"
                          onClick={() => {
                            handleDeleteBlogButton(row.id);
                          }}
                        >
                          <ActionIcons>
                            <DeleteIcon fontSize="small" />
                          </ActionIcons>
                        </Tooltip>
                      </SmallTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[3, 5, 7]}
              component="div"
              count={prsonalFilterData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
