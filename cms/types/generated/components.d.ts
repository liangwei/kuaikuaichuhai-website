import type { Schema, Struct } from '@strapi/strapi';

export interface CaseRepeatable extends Struct.ComponentSchema {
  collectionName: 'components_case_repeatables';
  info: {
    displayName: 'repeatable';
  };
  attributes: {
    metric: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

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
      'case.repeatable': CaseRepeatable;
      'service.feature': ServiceFeature;
    }
  }
}
