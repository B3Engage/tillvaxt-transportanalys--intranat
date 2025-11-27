import * as React from 'react';
import { renderToString } from 'react-dom/server';
import router from '@sitevision/api/common/router';
import appData from "@sitevision/api/server/appData";
import appInfo from "@sitevision/api/server/appInfo";
import roleUtil from '@sitevision/api/server/RoleUtil';
import versionUtil from "@sitevision/api/server/VersionUtil";
import portletContext from "@sitevision/api/server/PortletContextUtil";
import App from './components/App/App.js';

const getCurrentPageId = () => {
  let currentPageId = portletContext.getCurrentPage().getIdentifier();
  if (!currentPageId.includes('_sitePage')) return currentPageId;
  return currentPageId.replace('_sitePage', '');
}

const checkIfUserIsDeveloper = () => {
  if (!appData.get('roleName')) {
    return { message: 'Dev: Ingen roll utpekad' };
  }
  const roleMatcherBuilder = roleUtil.getRoleMatcherBuilder();
  const currentUser = portletContext.getCurrentUser();s
  const currentPage = portletContext.getCurrentPage();
  roleMatcherBuilder.setUser(currentUser);
  const role = roleUtil.getRoleByName(appData.get('roleName'));
  if (!role) {
    return { message: 'Dev: Otillgänglig roll' };
  }
  roleMatcherBuilder.addRole(role);

  const roleMatcher = roleMatcherBuilder.build();
  return roleMatcher.matchesAny(currentPage);
}

router.get('/', (req, res) => {
  const isInEditMode = versionUtil.getCurrentVersion() === versionUtil.OFFLINE_VERSION;
  const isDeveloper = checkIfUserIsDeveloper();
  if (isDeveloper.message) {
    if (isInEditMode) {
      res.send(isDeveloper.message);
    }
    return;
  }
  const id = getCurrentPageId() + '/' + appInfo['jcr:uuid'];

  const initialObject = {
    id,
    isDeveloper,
    isInEditMode,
  }

  res.agnosticRender(renderToString(<App initialObject={initialObject} />), {
    initialObject
  });
});
