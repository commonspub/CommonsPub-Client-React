import * as React from 'react';
import { Flex, Box, Text } from 'rebass/styled-components';
import media from 'styled-media-query';
import { i18nMark, Trans } from '@lingui/react';
import styled from 'ui/themes/styled';
import { FormikHook } from 'ui/@types/types';
import { ChevronLeft, Sliders, Settings as Sett, MapPin } from 'react-feather';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Input, Textarea } from '@rebass/forms';
import DropzoneArea from '../../../components/elements/DropzoneModal';
import { ContainerForm, Actions } from 'ui/modules/Modal';
import Button from 'ui/elements/Button';
import { useHistory } from 'react-router';
import Preferences from './preferences';

const tt = {
  placeholders: {
    name: i18nMark('Choose a name for the community'),
    summary: i18nMark(
      'Please describe who might be interested in this community and what kind of collections it is likely to contain...'
    ),
    icon: i18nMark('Enter the URL of an image to represent the community'),
    location: i18nMark('Choose a location')
  }
};

export interface Props {
  formik: FormikHook<EditProfile>;
  basePath: string;
  displayUsername: string;
}

export interface EditProfile {
  name: string;
  summary: string;
  icon: string;
  image: string;
  location: string;
}

export const Settings: React.FC<Props> = ({
  basePath,
  formik,
  displayUsername
}) => {
  return (
    <MainContainer>
      <Sidebar basePath={basePath} />
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <Box sx={{ width: '600px' }}>
              <Switch>
                <Route path={`${basePath}/preferences`}>
                  <Preferences />
                </Route>
                {/* <Route path={`${basePath}/accounts`}>acc</Route>
              <Route path={`${basePath}/notifications`}>notif</Route>
              <Route path={`${basePath}/admin`}>admin</Route> */}
                <Route path={`${basePath}`}>
                  <ProfileBox p={1} pb={2}>
                    <Hero>
                      <Flex>
                        <Bg>
                          <DropzoneArea
                            initialUrl={formik.values.image}
                            formikForm={formik}
                          />
                        </Bg>
                      </Flex>
                      <FlexProfile>
                        <WrapperHero>
                          <Img>
                            <DropzoneArea
                              initialUrl={formik.values.icon}
                              formikForm={formik}
                            />
                          </Img>
                        </WrapperHero>
                      </FlexProfile>
                      <HeroInfo ml={3}>
                        <CollectionContainerForm>
                          <Input
                            placeholder={tt.placeholders.name}
                            disabled={formik.isSubmitting}
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                          />
                        </CollectionContainerForm>

                        <Username mt={1} fontSize={2}>
                          {displayUsername}
                        </Username>
                        <CollectionContainerForm>
                          <Textarea
                            placeholder={tt.placeholders.summary}
                            disabled={formik.isSubmitting}
                            name="summary"
                            value={formik.values.summary}
                            onChange={formik.handleChange}
                          />
                        </CollectionContainerForm>
                        <Location mt={2}>
                          <span>
                            <MapPin strokeWidth={1} size={20} />
                          </span>
                          <CollectionContainerForm>
                            <Input
                              placeholder={tt.placeholders.location}
                              disabled={formik.isSubmitting}
                              name="location"
                              value={formik.values.location}
                              onChange={formik.handleChange}
                            />
                          </CollectionContainerForm>
                        </Location>
                      </HeroInfo>
                    </Hero>
                    <Actions sx={{ height: 'inherit !important' }}>
                      <Button
                        variant="primary"
                        disabled={formik.isSubmitting}
                        type="submit"
                        style={{ marginLeft: '10px' }}
                        onClick={formik.submitForm}
                      >
                        <Trans>Save</Trans>
                      </Button>
                    </Actions>
                  </ProfileBox>
                </Route>
              </Switch>
            </Box>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
    </MainContainer>
  );
};

const Sidebar = ({ basePath }) => {
  const history = useHistory();

  return (
    <WrapperPanel ml={0} mr={2}>
      <Panel>
        <Nav>
          <NavItem p={3} fontSize={1}>
            <Box sx={{ cursor: 'pointer' }} onClick={() => history.goBack()}>
              <Flex
                alignItems="center"
                sx={{ textTransform: 'capitalize', fontSize: '14px' }}
              >
                <Icon className="icon" mr={1}>
                  <ChevronLeft size={20} />
                </Icon>
                Back to MoodleNet
              </Flex>
            </Box>
          </NavItem>
          <NavItem p={3} fontSize={1}>
            <NavLink exact to={`${basePath}/`}>
              <Flex
                alignItems="center"
                sx={{ textTransform: 'capitalize', fontSize: '14px' }}
              >
                <Icon className="icon" mr={1}>
                  <Sett size={20} />
                </Icon>
                General information
              </Flex>
            </NavLink>
          </NavItem>
          <NavItem p={3} fontSize={1}>
            <NavLink to={`${basePath}/preferences`}>
              <Flex
                alignItems="center"
                sx={{ textTransform: 'capitalize', fontSize: '14px' }}
              >
                <Icon className="icon" mr={1}>
                  <Sliders size={20} />
                </Icon>
                Preferences
              </Flex>
            </NavLink>
          </NavItem>
          {/* <NavItem p={3} fontSize={1}>
          <NavLink to={`${basePath}/accounts`}>
          <Flex alignItems="center" sx={{textTransform: "capitalize", fontSize: "14px"}}>
                    <Icon className="icon" mr={1}><User size={20} /></Icon>Account
                </Flex>
          </NavLink>
        </NavItem>
        <NavItem p={3} fontSize={1}>
        <NavLink to={`${basePath}/notifications`}>
        <Flex alignItems="center" sx={{textTransform: "capitalize", fontSize: "14px"}}>
                    <Icon className="icon" mr={1}><Bell size={20} /></Icon>Notifications
                </Flex>
        </NavLink>
        </NavItem>
        <NavItem p={3} fontSize={1}>
          <NavLink to={`${basePath}/admin`}>
          <Flex alignItems="center" sx={{textTransform: "capitalize", fontSize: "14px"}}>
                    <Icon className="icon" mr={1}><Zap size={20} /></Icon>Admin
                </Flex>
          </NavLink>
        </NavItem> */}
        </Nav>
      </Panel>
    </WrapperPanel>
  );
};

const CollectionContainerForm = styled(ContainerForm)`
  input {
    background: #fbfbfb;
    border: 0;
    font-weight: 700;
  }

  textarea {
    background: #fbfbfb;
    border-radius: 2px;
    border: 0;
    height: 120px;
    resize: none;
  }
`;

const Img = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 6px;
  background: ${props => props.theme.colors.lightgray};
  border: 3px solid white;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  margin-right: 16px;
`;

const Bg = styled(Box)`
  height: 250px;
  border-radius: 4px;
  width: 100%;
  display: inline-block;
  background: red;
`;
const FlexProfile = styled(Flex)`
  justify-content: space-between;
  ${media.lessThan('860px')`
  flex-direction: column;
  align-items: center;
  text-align: center;
`};
`;

const ProfileBox = styled(Box)``;

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  font-size: 14px;
`;

const Location = styled(Flex)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  line-height: 26px;
  font-size: 14px;
  border-radius: 100px;
  align-items: center;
  span {
    margin-right: 8px;
    & svg {
      stroke: ${props => props.theme.colors.gray};
      vertical-align: text-bottom;
    }
    .--rtl & {
      margin-left: 8px;
      margin-right: 0px;
    }
  }
`;

const WrapperHero = styled.div`
  padding: 24px;
  padding-top: 0;
  z-index: 9999;
  position: relative;
  margin-top: -60px;
  padding-bottom: 0;
`;

const Hero = styled.div`
  width: 100%;
  position: relative;
  border-radius: 6px;
  & p {
    color: ${props => props.theme.colors.darkgray};
    padding: 0 24px;
    margin-left: 120px;
    margin: 0;
    margin-left: 136px;
    margin-top: -40px;
    line-height: 26px;
    font-size: 16px;
    padding-bottom: 16px;
  }
`;

const HeroInfo = styled(Box)`
  & button {
    span {
      vertical-align: sub;
      display: inline-block;
      height: 30px;
      margin-right: 4px;
    }
  }
`;

const Icon = styled(Box)`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  svg {
    stroke: ${props => props.theme.colors.gray};
  }
`;

export const WrapperPanel = styled(Flex)`
  width: 350px;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  font-family: ${props => props.theme.fontFamily};
  &.extra {
    width: 100%;
  }
  ${media.lessThan('1095px')`
  width: 290px;
`};
  ${media.lessThan('1005px')`
   display: none;
  `};
`;

export const Panel = styled(Box)`
  background: #fff;
  border-radius: 4px;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  margin-bottom: 8px !important;
`;

export const PanelTitle = styled(Text)`
  text-transform: uppercase;
  border-bottom: 4px solid ${props => props.theme.colors.lighter};
  padding: 16px;
`;

export const Nav = styled(Box)``;

export const NavItem = styled(Text)`
color: ${props => props.theme.colors.darkgray}
border-bottom: 1px solid ${props => props.theme.colors.lighter};
a {
  color: ${props => props.theme.colors.darkgray}
  text-decoration: none;
  font-weight: 700;
  &.active {
      color: ${props => props.theme.colors.primary};
    .icon {
        background: ${props => props.theme.colors.lighter};
        svg {
          stroke: ${props => props.theme.colors.primary};
        }
    }
    
  }
}
&:hover {
    .icon {
        background: ${props => props.theme.colors.lighter};
        svg {
          stroke: ${props => props.theme.colors.primary};
        }
    }
  }
  `;

export const HomeBox = styled(Flex)`
      max-width: 600px;
        width: 100%;
        align-items: flex-start;
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: auto;
        flex-direction: column;
        margin: 0px;
        min-height: 0px;
        min-width: 0px;
        padding: 0px;
        position: relative;
        z-index: 0;
  ${media.lessThan('1005px')`
  max-width: 100%;
  `};
  // ${media.lessThan('1280px')`
  // top: 60px;
  // `};
          `;

export const MainContainer = styled(Flex)`
  align-items: stretch;
  flex-grow: 1;
  flex-direction: row;
  width: 100%;
`;

export const WrapperCont = styled(Flex)`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  background: white;
  border-radius: 4px;
  z-index: 0;
`;

export const Wrapper = styled(Flex)`
  display: flex;
  flex-direction: column;
  flex: 1;
  & ul {
    display: block;

    & li {
      display: inline-block;

      & h5 {
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
  & h4 {
    margin: 0;
    font-weight: 400 !important;
    font-size: 14px !important;
    color: #151b26;
    line-height: 40px;
  }
`;