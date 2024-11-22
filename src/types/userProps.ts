interface userProps {
  id: String;
  email: string;
  password: string;
  name: string;
  role: string;
  portifolio: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
}

export { userProps };
