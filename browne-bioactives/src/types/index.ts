export type DivisionId = 'cosmetics' | 'research';

export interface Product {
  id: string;
  division: DivisionId;
  name: string;
  chemicalName: string;
  formula: string;
  casNumber: string;
  category: string;
  applications: string[];
  description: string;
  specifications: {
    purity: string;
    appearance: string;
    solubility: string;
    molecularWeight: string;
  };
  benefits: string[];
  image?: string;
  minOrderQuantity: string;
  bulkPricing: {
    quantity: string;
    priceRange: string;
  }[];
}

export interface SampleRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  productIds: string[];
  quantity: string;
  application: string;
  message: string;
  companyWebsite?: string;
  estimatedAnnualVolume?: string;
}

export interface BulkQuoteRequest extends SampleRequest {
  deliveryTimeline: string;
  qualityRequirements: string;
  targetPrice?: string;
}
