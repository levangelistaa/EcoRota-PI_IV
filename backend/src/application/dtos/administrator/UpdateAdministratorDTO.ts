export interface UpdateAdministratorInputDTO {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateAdministratorOutputDTO {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
