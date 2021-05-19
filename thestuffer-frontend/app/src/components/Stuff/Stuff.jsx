import React, {
  useContext,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { stuffInstance } from '../../axios';
import { Map } from '../Map';
import { Showcase } from '../Showcase';
import { ThrowingCard } from '../ThrowingCard';
import AuthContext from '../../context/AuthContext';

import './Stuff.css';

const CLICK_RADIUS = 5;

const Stuff = () => {
  const params = useParams();
  const [landingTarget, setLandingTarget] = useState(null);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const maxPage = useRef(true);
  const selectedPosition = useRef({
    lat: {
      gt: 0,
      lt: 0,
    },
    lng: {
      gt: 0,
      lt: 0,
    },
    floor: 0,
  });

  const [{ hits, isLoading, error }, setData] = useState({
    hits: [],
    isLoading: false,
    error: null,
    landingTarget: null,
  });

  const searchHandler = async (_page) => {
    if (!selectedPosition.current || _page < 0) return;

    const payload = {
      collection: 'throwing',
      landing_id: landingTarget,
      position: selectedPosition.current,
      params: {
        count: 10,
        page: _page,
      },
    };
    console.log(payload);

    setData({ isLoading: true });
    try {
      const res = await stuffInstance.post('/stuff/search', payload);
      if (!res.data.ok) throw new Error(res.data.message);
      setData({
        isLoading: false,
        hits: res.data.hits,
      });
      if (res.data.hits.length !== 0) maxPage.current = true;
      setPage(_page);
    } catch (error) {
      setData({ isLoading: false, error });
    }
  };

  const clickHandler = useCallback(
    async ({ event, landingMode }) => {
      const pos = event.latlng;

      selectedPosition.current = {
        lat: {
          gt: pos.lat - CLICK_RADIUS,
          lt: pos.lat + CLICK_RADIUS,
        },
        lng: {
          gt: pos.lng - CLICK_RADIUS,
          lt: pos.lng + CLICK_RADIUS,
        },
        floor: 0,
      };

      if (!landingMode) await searchHandler(0);
    },
    [landingTarget, setData]
  );

  const pageHandler = async (shift) => {
    await searchHandler(page + shift);
  };

  const cards =
    hits &&
    hits.map((data) => {
      return <ThrowingCard key={data._id} data={data} />;
    });

  const mapComponent = useMemo(
    () => (
      <Map
        mapStyle={{
          backgroundColor: 'black',
          height: 'calc(100vh - 150px)',
        }}
        mapName={params.map}
        clickHandler={clickHandler}
        onChangeTarget={setLandingTarget}
      />
    ),
    [params, setLandingTarget, clickHandler]
  );

  const createButton = () => {
    return (
      <div>
        {user && landingTarget && (
          <LinkContainer
            to={`/stuff/create/throwing?id=${landingTarget}&map=${params.map}`}
          >
            <Button variant='light' block>
              Create new throwing spot
            </Button>
          </LinkContainer>
        )}
        {user && user.role === 'admin' && !landingTarget && (
          <LinkContainer to={`/stuff/create/landing?map=${params.map}`}>
            <Button variant='light' block>
              Create new landing spot
            </Button>
          </LinkContainer>
        )}
      </div>
    );
  };

  return (
    <Container fluid as={Row}>
      <Col md={6}>
        {mapComponent}
        <Row>{createButton()}</Row>
      </Col>
      <Col md={6}>
        <Row>{error && 'Something goes wrong! ' + error}</Row>
        <Row>
          {
            <Container className='showcase' as={Col}>
              {cards}
            </Container>
          }
        </Row>
      </Col>
      {/* {!isLoading && !error && (
        <Row className='commandBar'>
          <Col>
            <Row className='commandRow'>
              <Button
                as={Col}
                variant='light'
                lg={{ span: 1, offset: 4 }}
                onClick={() => pageHandler(-1)}
              >
                {'<'}
              </Button>
              <Col lg={{ span: 2 }}>
                <h3>{page}</h3>
              </Col>
              <Button
                as={Col}
                variant='light'
                lg={{ span: 1 }}
                onClick={() => pageHandler(1)}
              >
                {'>'}
              </Button>
            </Row>
          </Col>
        </Row>
      )} */}
    </Container>
  );
};

export default Stuff;
