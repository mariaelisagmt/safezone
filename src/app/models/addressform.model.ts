export class AddressForm {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  type: number;
  description: string;

  constructor(data: AddressForm) {
    this.title = data.title;
    this.address = data.address;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.type = data.type;
    this.description = data.description;
  }
}
