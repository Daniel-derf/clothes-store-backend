export default class User {
  id: number;
  password: string;
  name: string;
  email: string;
  ordersIds: number[];
  ratingsIds: number[];
  addressesIds: number[];

  constructor(props: {
    id: number;
    name: string;
    password: string;
    email: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}
