type Profile = 'admin' | 'client';

export default class User {
  id: number;
  password: string;
  name: string;
  email: string;
  ordersIds: number[];
  ratingsIds: number[];
  addressesIds: number[];
  profile: Profile;

  constructor(props: {
    id: number;
    name: string;
    password: string;
    email: string;
    profile: Profile;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.ordersIds = [];
    this.ratingsIds = [];
    this.addressesIds = [];
    this.profile = props.profile;
  }
}
