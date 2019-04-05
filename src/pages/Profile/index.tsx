// View a Profile
import * as React from 'react';
import { compose } from 'recompose';
import { Trans } from '@lingui/macro';
import { Grid } from '@zendeskgarden/react-grid';
import { graphql, GraphqlQueryControls, OperationOption } from 'react-apollo';
import styled from '../../themes/styled';
import Main from '../../components/chrome/Main/Main';
import Loader from '../../components/elements/Loader/Loader';
import CollectionCard from '../../components/elements/Collection/Collection';
import CommunityCard from '../../components/elements/Community/Community';
import media from 'styled-media-query';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import { Tabs, TabPanel } from 'react-tabs';
import { Collection, Community, Eye } from '../../components/elements/Icons';
const getUserQuery = require('../../graphql/getUser.graphql');
import FollowingCollectionsLoadMore from '../../components/elements/Loadmore/followingCollections';
import JoinedCommunitiesLoadMore from '../../components/elements/Loadmore/joinedCommunities';
import HeroComp from './Hero';
import { WrapperTab, OverlayTab } from '../communities.community/Community';
// import TimelineItem from '../../components/elements/TimelineItem';

enum TabsEnum {
  Overview = 'Overview',
  Communities = 'Joined communities',
  Collections = 'Followed collections'
}

interface Data extends GraphqlQueryControls {
  me: {
    user: {
      name: string;
      icon: string;
      summary: string;
      id: string;
      localId: string;
      outbox: {
        edges: any[];
        totalCount: number;
        pageInfo: {
          startCursor: number;
          endCursor: number;
        };
      };
      joinedCommunities: {
        edges: any[];
        totalCount: number;
        pageInfo: {
          startCursor: number;
          endCursor: number;
        };
      };
      followingCollections: {
        edges: any[];
        totalCount: number;
        pageInfo: {
          startCursor: number;
          endCursor: number;
        };
      };
    };
  };
}

interface Props {
  data: Data;
}

type State = {
  tab: TabsEnum;
};

class CommunitiesFeatured extends React.Component<Props, State> {
  state = {
    tab: TabsEnum.Collections
  };
  render() {
    return (
      <>
        <Main>
          <Grid>
            {this.props.data.error ? (
              <span>
                <Trans>Error loading user</Trans>
              </span>
            ) : this.props.data.loading ? (
              <Loader />
            ) : (
              <WrapperCont>
                <HeroComp user={this.props.data.me.user} />

                <WrapperTab>
                  <OverlayTab>
                    <Tabs>
                      <SuperTabList>
                        <SuperTab>
                          <span>
                            <Eye
                              width={20}
                              height={20}
                              strokeWidth={2}
                              color={'#a0a2a5'}
                            />
                          </span>
                          <h5>
                            <Trans>Timeline</Trans>
                          </h5>
                        </SuperTab>
                        <SuperTab>
                          <span>
                            <Collection
                              width={20}
                              height={20}
                              strokeWidth={2}
                              color={'#a0a2a5'}
                            />
                          </span>
                          <h5>
                            <Trans>Followed Collections</Trans>
                          </h5>
                        </SuperTab>
                        <SuperTab>
                          <span>
                            <Community
                              width={20}
                              height={20}
                              strokeWidth={2}
                              color={'#a0a2a5'}
                            />
                          </span>{' '}
                          <h5>
                            <Trans>Joined Communities</Trans>
                          </h5>
                        </SuperTab>
                      </SuperTabList>
                      <TabPanel>
                        <div>
                          {/* {this.props.data.me.user.outbox.edges.map((t, i) => (
                            <TimelineItem node={t.node} user={t.node.user} key={i} />
                          ))} */}
                          {/* {(this.props.data.me.user.outbox.pageInfo
                            .startCursor === null &&
                            this.props.data.me.user.outbox.pageInfo.endCursor ===
                              null) ||
                          (this.props.data.me.user.outbox.pageInfo.startCursor &&
                            this.props.data.me.user.outbox.pageInfo.endCursor ===
                              null) ? null : (
                            <LoadMore
                              onClick={() =>
                                this.props.data.fetchMore({
                                  variables: {
                                    end: this.props.data.me.user.outbox.pageInfo
                                      .endCursor
                                  },
                                  updateQuery: (
                                    previousResult,
                                    { fetchMoreResult }
                                  ) => {
                                    console.log(fetchMoreResult);
                                    const newNodes =
                                      fetchMoreResult.me.user.outbox.edges;
                                    const pageInfo =
                                      fetchMoreResult.me.user.outbox.pageInfo;
                                    console.log(newNodes);
                                    return newNodes.length
                                      ? {
                                          // Put the new comments at the end of the list and update `pageInfo`
                                          // so we have the new `endCursor` and `hasNextPage` values
                                          community: {
                                            ...previousResult.community,
                                            __typename:
                                              previousResult.me.user.__typename,
                                            outbox: {
                                              ...previousResult.me.user.outbox,
                                              edges: [
                                                ...previousResult.me.user.outbox
                                                  .edges,
                                                ...newNodes
                                              ]
                                            },
                                            pageInfo
                                          }
                                        }
                                      : {
                                          community: {
                                            ...previousResult.community,
                                            __typename:
                                              previousResult.community
                                                .__typename,
                                            outbox: {
                                              ...previousResult.community.outbox,
                                              edges: [
                                                ...previousResult.community
                                                  .outbox.edges
                                              ]
                                            },
                                            pageInfo
                                          }
                                        };
                                  }
                                })
                              }
                            >
                              <Trans>Load more</Trans>
                            </LoadMore>
                          )} */}
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <ListCollections>
                          {this.props.data.me.user.followingCollections.edges.map(
                            (comm, i) => (
                              <CollectionCard
                                key={i}
                                collection={comm.node}
                                communityId={comm.node.localId}
                              />
                            )
                          )}
                        </ListCollections>
                        <FollowingCollectionsLoadMore
                          collections={
                            this.props.data.me.user.followingCollections
                          }
                          fetchMore={this.props.data.fetchMore}
                          me
                        />
                      </TabPanel>
                      <TabPanel
                        label={`${TabsEnum.Communities}`}
                        key={TabsEnum.Communities}
                        style={{ height: '100%' }}
                      >
                        <>
                          <List>
                            {this.props.data.me.user.joinedCommunities.edges.map(
                              (community, i) => (
                                <CommunityCard
                                  key={i}
                                  summary={community.node.summary}
                                  title={community.node.name}
                                  collectionsCount={
                                    community.node.collectionsCount
                                  }
                                  icon={community.node.icon || ''}
                                  followed={community.node.followed}
                                  id={community.node.localId}
                                  externalId={community.node.id}
                                  followersCount={community.node.followersCount}
                                  threadsCount={
                                    community.node.threads.totalCount
                                  }
                                />
                              )
                            )}
                          </List>
                          <JoinedCommunitiesLoadMore
                            me
                            communities={
                              this.props.data.me.user.joinedCommunities
                            }
                            fetchMore={this.props.data.fetchMore}
                          />
                        </>
                      </TabPanel>
                    </Tabs>
                  </OverlayTab>
                </WrapperTab>
              </WrapperCont>
            )}
          </Grid>
        </Main>
      </>
    );
  }
}

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  padding: 16px;
  padding-top: 8px;
  ${media.lessThan('medium')`
  grid-template-columns: 1fr;
  grid-column-gap: 0px;
`};
`;

export const ListCollections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  padding: 8px;
`;

export const WrapperCont = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  box-sizing: border-box;
`;

const withGetCollections = graphql<
  {},
  {
    data: {
      me: any;
    };
  }
>(getUserQuery, {
  options: (props: Props) => ({
    variables: {
      limitComm: 15,
      limitColl: 15
    }
  })
}) as OperationOption<{}, {}>;

export default compose(withGetCollections)(CommunitiesFeatured);
