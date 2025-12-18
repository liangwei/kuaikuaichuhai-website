import type { Schema, Struct } from '@strapi/strapi';

export interface ServiceFeature extends Struct.ComponentSchema {
  collectionName: 'components_service_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'service.feature': ServiceFeature;
    }
  }
}
