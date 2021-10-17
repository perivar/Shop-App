class Product {
  public id: string;
  public userId: string;
  public seller: string;
  public name: string;
  public url: string;
  public description: string;
  public price: number;
  public location: string;
  public profilePic: string;

  constructor(
    id: string,
    userId: string,
    seller: string,
    name: string,
    url: string,
    description: string,
    price: number,
    location?: string,
    profilePic?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.seller = seller;
    this.name = name;
    this.url = url;
    this.description = description;
    this.price = price;
    this.location = location;
    this.profilePic = profilePic;
  }
}

export default Product;
