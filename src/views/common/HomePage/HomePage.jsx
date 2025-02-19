import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CardOne } from "../../../components";
import { Spinner } from "reactstrap";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAllProperties(1, 10, "all");
  }

  render() {
    let renderComponent;
    const { properties } = this.props.property;

    if (properties === null || Object.keys(properties).length === 0) {
      renderComponent = (
        <div
          style={{ width: "100%", height: "100vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <Spinner color="primary" />
        </div>
      );
    }
    if (properties.length > 0) {
      renderComponent = properties.slice(0, 3).map(property => {
        return (
          <div key={property._id} className="col-lg-4 col-md-6 col-sm-12 ">
            <CardOne
              propertyId={property._id}
              img={property.imgUrl}
              title={property.title}
              price={property.price}
              area={property.area}
              beds={property.beds}
              baths={property.baths}
              garages={property.garages}
              btnText="View Details"
            />
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        
        <div className="container py-5" style={styles.common}>
          <h1 className="display-4 mb-5 text-center">Properties...</h1>
          <div className="row  m-auto">{renderComponent}</div>
          <div className="text-center my-5">
            <Link to="/properties-list" className="btn btn-primary mt-3">
              More Properties
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const styles = {
  common: {
    height: "100vh"
  }
};

const mapStateToProps = state => {
  return {
    property: state.property
  };
};

export default connect(
  mapStateToProps,
  actions
)(HomePage);
