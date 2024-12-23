import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CounterItem = ({ end, duration, suffix, decimal, text }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <div ref={ref}>
      <h2 className="mb-2">
        <span className="counter-value">
          {hasAnimated && (
            <CountUp
              start={0}
              end={end}
              duration={duration}
              decimals={decimal ? 1 : 0}
              suffix={suffix}
            />
          )}
        </span>
      </h2>
      <div className="text-muted">{text}</div>
    </div>
  );
};

const Counter = () => {
  return (
    <React.Fragment>
      <section className="py-5 position-relative bg-light">
        <Container>
          <Row className="text-center gy-4">
            <Col lg={3} className="col-6">
              <CounterItem
                end={100}
                duration={2}
                suffix="+"
                text="Projects Completed"
              />
            </Col>

            <Col lg={3} className="col-6">
              <CounterItem end={24} duration={2} text="Win Awards" />
            </Col>

            <Col lg={3} className="col-6">
              <CounterItem
                end={20.3}
                duration={2}
                decimal={true}
                suffix="k"
                text="Satisfied Clients"
              />
            </Col>

            <Col lg={3} className="col-6">
              <CounterItem end={50} duration={2} text="Employees" />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Counter;
