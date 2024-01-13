import React, { useState } from "react";
import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import TourCard from './../shared/TourCard';
import Newsletter from './../shared/Newslletter'

const SearchResultList = () => {

  const location = useLocation()

  //const [data] = useState(location.state);

  const [data] = useState(Array.isArray(location.state) ? location.state : []);


  //console.log(data);
  console.log('Data Length:', data.length);
  return  <>
      <CommonSection title={"Tour Search Result"}/>
      <section>
        <Container>
          <Row>
            {
              
              data.length === 0 ? (<h4 className="text-center"> No tour found</h4>) : ( data?.map(tour=> <Col lg='3' className="mb-4" key={tour._id}>
              <TourCard tour={tour}/></Col>))
              
            }
          </Row>
        </Container>
      </section>
      <Newsletter/>
  </>
  
};

export default SearchResultList;