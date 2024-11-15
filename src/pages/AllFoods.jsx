import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { getAPI } from "../api";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import "../styles/all-foods.css";
import "../styles/pagination.css";

const Allproducts = () => {
  const [AllData, setAllData] = useState([]); // Default to empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  // Fetch data from API
  useEffect(() => {
    getAPI("newProduct")
      .then((resp) => {
        // Log the response to check its type
        console.log("Fetched data:", resp.data);
        // Ensure the response is an array
        if (Array.isArray(resp.data)) {
          setAllData(resp.data);
        } else {
          console.error("Fetched data is not an array:", resp);
          setAllData([]); // Fallback to an empty array if it's not an array
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setAllData([]); // Set empty array if there's an error fetching data
      });
  }, []);

  // Handle search
  const searchedProduct = Array.isArray(AllData)
    ? AllData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(visitedPage, visitedPage + productPerPage);

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All-products">
      <CommonSection title="All products" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-50">
                  <option>Default</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                  <option value="high-price">High Price</option>
                  <option value="low-price">Low Price</option>
                </select>
              </div>
            </Col>

            {/* Display Product Cards */}
            {displayPage.length > 0 ? (
              displayPage.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                  <ProductCard item={item} />
                </Col>
              ))
            ) : (
              <Col xs="12">
                <p>No products found</p>
              </Col>
            )}

            {/* Pagination */}
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName="paginationBttns"
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Allproducts;
