import React from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl p-6">
        <Typography
          variant="h1"
          className="mb-6 text-center text-4xl font-bold"
        >
          Welcome to the IT & TT Department
        </Typography>
        <Typography
          variant="h2"
          className="mb-6 text-center text-2xl font-medium"
        >
          Managing Staff Information Efficiently
        </Typography>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                Staff Management
              </Typography>
              <Typography>
                Manage staff details such as MSCB, names, gender, date of birth,
                phone numbers, and more.
              </Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                Position Management
              </Typography>
              <Typography>
                Keep track of multiple positions held by staff members along
                with their main specialization.
              </Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                Rewards & Competitions
              </Typography>
              <Typography>
                Manage rewards and competitions affecting promotion timelines
                and professional development.
              </Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                Access Control
              </Typography>
              <Typography>
                Assign roles such as Super Admin, Leader, or Lecturer to manage
                access and privileges.
              </Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                Search & Statistics
              </Typography>
              <Typography>
                Easily search for staff by name or MSCB and view statistics
                based on unit, qualification, or position.
              </Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                Salary Increments
              </Typography>
              <Typography>
                List staff eligible for salary increments based on
                qualifications and performance.
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button color="blue" ripple={true}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
