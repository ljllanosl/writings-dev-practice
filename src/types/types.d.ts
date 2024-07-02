export interface CardType {
  title: string;
  description: string;
  category: Category;
  date: Date;
  imageUrl: string;
  imageAlt: string;
}

export enum Category {
  Architecture = "Architecture",
  Cloud = "Cloud",
  DevOps = "DevOps",
  Explainers = "Explainers",
  JavaScript = "JavaScript",
  Scalability = "Scalability",
  Terraform = "Terraform",
}