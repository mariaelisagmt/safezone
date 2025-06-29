export class AddressData {
    place_id!: number;
    licence!: string;
    osm_type!: string;
    osm_id!: number;
    lat!: string;
    lon!: string;
    category!: string;
    type!: string;
    place_rank!: number;
    importance!: number;
    addresstype!: string;
    name!: string;
    display_name!: string;
    address!: {
        house_number?: string;
        shop?: string;
        amenity?: string;
        aeroway?: string;
        road?: string;
        suburb?: string;
        city?: string;
        municipality?: string;
        state_district?: string;
        state?: string;
        ISO3166_2_lvl4?: string;
        region?: string;
        postcode?: string;
        country?: string;
        country_code?: string;
        hamlet?: string;
        industrial?: string;
        village?: string;
        town?: string;
        city_district?: string;
    };
    boundingbox!: [string, string, string, string];

    constructor(data: Partial<AddressData>) {
        Object.assign(this, data);
    }

    getAddress(): string {
        let finalString = '';
        switch (this.addresstype) {
            case "building":  // Exemplo: prédio, casa, apartamento. Devem ter numeração na API
            case "place":
                finalString = `${this.address.road} ${this.address.house_number} - ${this.address.suburb}, ${this.address.city} - ${this.address.state}, ${this.address.postcode}`;
                break;

            case "amenity":  // Exemplo: restaurante, escola, hospital. Alguns desses podem ter numeração ou o campo "amenity" na API
                let roadAddress = this.address.house_number ? `${this.address.road} ${this.address.house_number}` : this.address.road;
                if (!this.address.amenity) {
                    finalString = `${roadAddress} - ${this.address.suburb}, ${this.address.city} - ${this.address.state}, ${this.address.postcode}`;
                } else {
                    finalString = `${this.address.amenity}, ${roadAddress} - ${this.address.suburb}, ${this.address.city} - ${this.address.state}, ${this.address.postcode}`;
                }
                break;

            case "road":  // Exemplo: estradas, rodovias, locais de lazer e turismo. Não possuem numeração na API
            case "highway":
            case "leisure":
            case "tourism":
                finalString = `${this.address.road} - ${this.address.suburb}, ${this.address.city} - ${this.address.state}, ${this.address.postcode}`;
                break;

            case "suburb":  // Exemplo: bairros, vilas, distritos. Não possuem numeração nem definição de rua nem CEP na API
                finalString = `${this.address.suburb}, ${this.address.city} - ${this.address.state}, ${this.address.postcode}`;
                break;

            case "shop":
                if (!this.address.house_number) {
                    finalString = `${this.address.shop} - ${this.address.road} ${this.address.house_number}, ${this.address.suburb}, ${this.address.city} - ${this.address.state}, ${this.address.postcode}`;
                } else {
                    finalString = `${this.address.shop} - ${this.address.road}, ${this.address.suburb}, ${this.address.city} - ${this.address.state}, ${this.address.postcode}`;
                }
                break;

            case "aeroway":  // Exemplo: aeroportos, heliportos. Possuem definições na API mas não vejo sentido
                finalString = `${this.address.aeroway} - ${this.address.suburb}, ${this.address.city} - ${this.address.state}, ${this.address.postcode}`;
                break;

            default:
                finalString = "Endereço não encontrado";
                break;
        }
        return finalString;
    }
}