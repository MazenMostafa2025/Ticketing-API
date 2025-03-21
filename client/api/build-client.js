import axios from 'axios';

const buildClient = ({req}) => {
  if (typeof window === 'undefined') {
    // we are on server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    })
  } else {
    // we are on client
    return axios.create({});
  }
}

export {buildClient}