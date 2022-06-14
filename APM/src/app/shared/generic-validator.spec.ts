import { GenericValidator } from './generic-validator';

describe('GenericValidator', () => {
  const validationMessages = {
    productName: {
      required: 'Product name is required.',
      minlength: 'Product name must be at least three characters.',
      maxlength: 'Product name cannot exceed 50 characters.'
    },
    productCode: {
      required: 'Product code is required.'
    },
    starRating: {
      range: 'Rate the product between 1 (lowest) and 5 (highest).'
    }
  };

  it('should create an instance', () => {
    expect(new GenericValidator(validationMessages)).toBeTruthy();
  });
s  
});
