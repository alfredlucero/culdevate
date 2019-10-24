import { Request } from "express";

interface MockRequest {
  body?: any;
  params?: any;
}

export const mockRequest = ({ body = {}, params = {} }: MockRequest): Request => {
  const req = {} as Request;

  req.body = body;
  req.params = params;
  // TODO: add more request properties as needed for unit tests

  return req;
};
