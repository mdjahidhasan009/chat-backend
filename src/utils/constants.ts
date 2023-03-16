export enum Routes {
  AUTH = 'auth',
  USERS = 'users',
  CONVERSATIONS = 'conversations',
  MESSAGES = 'conversations/:id/messages',
  GROUPS = 'groups',
  GROUP_MESSAGES = 'groups/:id/messages',
  GROUP_RECIPIENTS = 'GROUP_RECIPIENTS_SERVICE',
}

export enum Services {
  AUTH = 'AUTH_SERVICES',
  USERS = 'USERS_SERVICES',
  CONVERSATIONS = 'CONVERSATIONS_SERVICE',
  MESSAGES = 'MESSAGES_SERVICE',
  GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
  GROUPS = 'GROUPS_SERVICE',
  GROUP_MESSAGES = 'groups/:id/messages',
  GROUP_RECIPIENTS = 'GROUP_RECIPIENTS_SERVICE',
}
