require('dotenv').config();
const supertest = require('supertest');
const { expect } = require('chai');

const url = `http://${process.env.HOST}:${process.env.PORT}/stuff/`;
const request = supertest(url);

describe('Stuff', () => {
  let ID = 'empty';
  describe('POST /create', () => {
    it('create', () => {
      return request
        .post('/throwing/create')
        .send({
          "landing_id": "azerty",
          "movement": "throw",
          "position": {
            "lat": 0,
            "lng": 0,
            "floor": 0
          },
          "video": {
            "id": "Gu064JTzQu8",
            "time": 100
          },
          "tickrate": {
            "64": true,
            "128": true
          },
          "description": "perfect smoke"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          ID = res.body._id
          console.log(res.body);
        });
    });
  });

  describe('GET /throwing/get/:id', () => {
    it('get id', () => {
      return request
        .get('/throwing/get/' + ID)
        .expect(200)
        .then(res => {
          console.log(res.body);
        });
    });
  });
});