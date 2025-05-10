import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import {Routes, Route} from 'react-router-dom';
import { Navigation } from './components';
import { MenuPlanner, FamilyPlanner } from './pages';


const App: React.FC = () => {
  return (
       <Container fluid>
      <Row className="justify-content-md-center">
        <Col lg="12" className="p-0">
          <Navigation />
        </Col>
         <Col xs="10" lg="10">
             <Routes>
          <Route path="/" element={<MenuPlanner />} />
          <Route path="/family" element={<FamilyPlanner />} />
        </Routes>
        </Col>
      </Row>
      </Container>
  );
};

export default App;
