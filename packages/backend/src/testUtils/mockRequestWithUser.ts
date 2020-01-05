import { RequestWithUser, UserData } from "../interfaces/requestWithUser";

interface MockRequestWithUser {
  user?: UserData;
  authHeader?: string | null;
  body?: any;
  params?: any;
}

export const mockRequestWithUser = ({
  user = {} as UserData,
  authHeader = "Bearer token",
  body = {},
  params = {},
}: MockRequestWithUser): RequestWithUser => {
  const req = { user } as RequestWithUser;

  req.body = body;
  req.params = params;
  req.header = ((headerName: string) => {
    if (headerName === "Authorization") {
      return authHeader;
    }

    return undefined;
  }) as any;
  // TODO: add more request properties as needed for unit tests

  return req;
};
