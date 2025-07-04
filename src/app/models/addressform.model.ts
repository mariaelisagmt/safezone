export class AddressForm {
  id: number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  date: Date;
  type: string;
  description: string;
  userId: number;

  constructor(data: AddressForm) {
    this.id = data.id;
    this.title = data.title;
    this.address = data.address;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.date = data.date;
    this.type = data.type;
    this.description = data.description;
    this.userId = data.userId;
  }
}
