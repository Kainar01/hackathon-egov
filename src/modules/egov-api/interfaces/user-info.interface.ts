export interface UserInfo {
  iin: number;
  lastName: string;
  firstName: string;
  middleName: string;
  engFirstName: string;
  engSurname: string;
  dateOfBirth: string;
  nationality: {
    code: string;
    nameRu: string;
    nameKz: string;
  };
}
