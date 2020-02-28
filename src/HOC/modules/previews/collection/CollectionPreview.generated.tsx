import * as Types from '../../../../graphql/types.generated';

import gql from 'graphql-tag';

export type CollectionPreviewFragment = (
  { __typename: 'Collection' }
  & Pick<Types.Collection, 'id' | 'icon' | 'isLocal' | 'canonicalUrl' | 'name' | 'summary' | 'resourceCount' | 'displayUsername'>
  & { myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, community: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id'>
    & { myFollow: Types.Maybe<(
      { __typename: 'Follow' }
      & Pick<Types.Follow, 'id'>
    )> }
  )> }
);

export const CollectionPreviewFragmentDoc = gql`
    fragment CollectionPreview on Collection {
  id
  icon
  isLocal
  canonicalUrl
  name
  summary
  resourceCount
  displayUsername
  myFlag {
    id
  }
  myFollow {
    id
  }
  community {
    id
    myFollow {
      id
    }
  }
}
    `;
