export default MUC;
export type MUCMessage = import("./message.js").default;
export type MUCOccupant = import("./occupant.js").default;
export type NonOutcastAffiliation = import("./affiliations/utils.js").NonOutcastAffiliation;
export type MemberListItem = any;
export type MessageAttributes = any;
export type MUCMessageAttributes = any;
export type UserMessage = any;
export type Builder = import("strophe.js").Builder;
/**
 * Represents an open/ongoing groupchat conversation.
 * @namespace MUC
 * @memberOf _converse
 */
declare class MUC extends ChatBox {
    defaults(): {
        bookmarked: boolean;
        chat_state: any;
        has_activity: boolean;
        hidden: boolean;
        hidden_occupants: boolean;
        message_type: string;
        name: string;
        num_unread_general: number;
        num_unread: number;
        roomconfig: {};
        time_opened: any;
        time_sent: string;
        type: string;
    };
    debouncedRejoin: import("lodash").DebouncedFunc<() => Promise<this>>;
    isEntered(): boolean;
    /**
     * Checks whether this MUC qualifies for subscribing to XEP-0437 Room Activity Indicators (RAI)
     * @method MUC#isRAICandidate
     * @returns { Boolean }
     */
    isRAICandidate(): boolean;
    /**
     * Checks whether we're still joined and if so, restores the MUC state from cache.
     * @private
     * @method MUC#restoreFromCache
     * @returns {Promise<boolean>} Returns `true` if we're still joined, otherwise returns `false`.
     */
    private restoreFromCache;
    /**
     * Join the MUC
     * @private
     * @method MUC#join
     * @param { String } [nick] - The user's nickname
     * @param { String } [password] - Optional password, if required by the groupchat.
     *  Will fall back to the `password` value stored in the room
     *  model (if available).
     */
    private join;
    /**
     * Clear stale cache and re-join a MUC we've been in before.
     * @private
     * @method MUC#rejoin
     */
    private rejoin;
    /**
     * @param {string} password
     */
    constructJoinPresence(password: string): Promise<import("strophe.js").Builder>;
    clearOccupantsCache(): void;
    /**
     * Given the passed in MUC message, send a XEP-0333 chat marker.
     * @param { MUCMessage } msg
     * @param { ('received'|'displayed'|'acknowledged') } [type='displayed']
     * @param { Boolean } force - Whether a marker should be sent for the
     *  message, even if it didn't include a `markable` element.
     */
    sendMarkerForMessage(msg: MUCMessage, type?: ("received" | "displayed" | "acknowledged"), force?: boolean): void;
    /**
     * Ensures that the user is subscribed to XEP-0437 Room Activity Indicators
     * if `muc_subscribe_to_rai` is set to `true`.
     * Only affiliated users can subscribe to RAI, but this method doesn't
     * check whether the current user is affiliated because it's intended to be
     * called after the MUC has been left and we don't have that information
     * anymore.
     * @private
     * @method MUC#enableRAI
     */
    private enableRAI;
    /**
     * Handler that gets called when the 'hidden' flag is toggled.
     * @private
     * @method MUC#onHiddenChange
     */
    private onHiddenChange;
    /**
     * @param {MUCOccupant} occupant
     */
    onOccupantAdded(occupant: MUCOccupant): void;
    /**
     * @param {MUCOccupant} occupant
     */
    onOccupantRemoved(occupant: MUCOccupant): void;
    /**
     * @param {MUCOccupant} occupant
     */
    onOccupantShowChanged(occupant: MUCOccupant): void;
    onRoomEntered(): Promise<void>;
    onConnectionStatusChanged(): Promise<void>;
    restoreSession(): Promise<any>;
    session: MUCSession;
    initDiscoModels(): void;
    features: Model;
    config: Model;
    initOccupants(): void;
    occupants: any;
    fetchOccupants(): any;
    handleAffiliationChangedMessage(stanza: any): void;
    /**
     * Handles incoming message stanzas from the service that hosts this MUC
     * @private
     * @method MUC#handleMessageFromMUCHost
     * @param { Element } stanza
     */
    private handleMessageFromMUCHost;
    /**
     * Handles XEP-0452 MUC Mention Notification messages
     * @private
     * @method MUC#handleForwardedMentions
     * @param { Element } stanza
     */
    private handleForwardedMentions;
    /**
     * Parses an incoming message stanza and queues it for processing.
     * @private
     * @method MUC#handleMessageStanza
     * @param {Builder|Element} stanza
     */
    private handleMessageStanza;
    /**
     * Register presence and message handlers relevant to this groupchat
     * @private
     * @method MUC#registerHandlers
     */
    private registerHandlers;
    presence_handler: any;
    domain_presence_handler: any;
    message_handler: any;
    domain_message_handler: any;
    affiliation_message_handler: any;
    removeHandlers(): this;
    invitesAllowed(): any;
    /**
     * Sends a message stanza to the XMPP server and expects a reflection
     * or error message within a specific timeout period.
     * @private
     * @method MUC#sendTimedMessage
     * @param {Builder|Element } message
     * @returns { Promise<Element>|Promise<TimeoutError> } Returns a promise
     *  which resolves with the reflected message stanza or with an error stanza or
     *  {@link TimeoutError}.
     */
    private sendTimedMessage;
    /**
     * Retract one of your messages in this groupchat
     * @method MUC#retractOwnMessage
     * @param {MUCMessage} message - The message which we're retracting.
     */
    retractOwnMessage(message: MUCMessage): Promise<void>;
    /**
     * Retract someone else's message in this groupchat.
     * @method MUC#retractOtherMessage
     * @param {MUCMessage} message - The message which we're retracting.
     * @param {string} [reason] - The reason for retracting the message.
     * @example
     *  const room = await api.rooms.get(jid);
     *  const message = room.messages.findWhere({'body': 'Get rich quick!'});
     *  room.retractOtherMessage(message, 'spam');
     */
    retractOtherMessage(message: MUCMessage, reason?: string): Promise<any>;
    /**
     * Sends an IQ stanza to the XMPP server to retract a message in this groupchat.
     * @private
     * @method MUC#sendRetractionIQ
     * @param {MUCMessage} message - The message which we're retracting.
     * @param {string} [reason] - The reason for retracting the message.
     */
    private sendRetractionIQ;
    /**
     * Sends an IQ stanza to the XMPP server to destroy this groupchat. Not
     * to be confused with the {@link MUC#destroy}
     * method, which simply removes the room from the local browser storage cache.
     * @method MUC#sendDestroyIQ
     * @param { string } [reason] - The reason for destroying the groupchat.
     * @param { string } [new_jid] - The JID of the new groupchat which replaces this one.
     */
    sendDestroyIQ(reason?: string, new_jid?: string): any;
    /**
     * Leave the groupchat.
     * @private
     * @method MUC#leave
     * @param { string } [exit_msg] - Message to indicate your reason for leaving
     */
    private leave;
    /**
     * @param {{name: 'closeAllChatBoxes'}} [ev]
     */
    close(ev?: {
        name: "closeAllChatBoxes";
    }): Promise<any>;
    canModerateMessages(): any;
    /**
     * Return an array of unique nicknames based on all occupants and messages in this MUC.
     * @private
     * @method MUC#getAllKnownNicknames
     * @returns { String[] }
     */
    private getAllKnownNicknames;
    getAllKnownNicknamesRegex(): RegExp;
    /**
     * @param {string} jid
     */
    getOccupantByJID(jid: string): any;
    /**
     * @param {string} nick
     */
    getOccupantByNickname(nick: string): any;
    /**
     * @param {string} nick
     */
    getReferenceURIFromNickname(nick: string): string;
    /**
     * Given a text message, look for `@` mentions and turn them into
     * XEP-0372 references
     * @param { String } text
     */
    parseTextForReferences(text: string): any[];
    /**
     * @param {Object} [attrs] - A map of attributes to be saved on the message
     * @returns {Promise<MUCMessage>}
     */
    getOutgoingMessageAttributes(attrs?: any): Promise<MUCMessage>;
    /**
     * Utility method to construct the JID for the current user as occupant of the groupchat.
     * @private
     * @method MUC#getRoomJIDAndNick
     * @returns {string} - The groupchat JID with the user's nickname added at the end.
     * @example groupchat@conference.example.org/nickname
     */
    private getRoomJIDAndNick;
    /**
     * Send a direct invitation as per XEP-0249
     * @method MUC#directInvite
     * @param { String } recipient - JID of the person being invited
     * @param { String } [reason] - Reason for the invitation
     */
    directInvite(recipient: string, reason?: string): void;
    /**
     * Refresh the disco identity, features and fields for this {@link MUC}.
     * *features* are stored on the features {@link Model} attribute on this {@link MUC}.
     * *fields* are stored on the config {@link Model} attribute on this {@link MUC}.
     * @private
     * @returns {Promise}
     */
    private refreshDiscoInfo;
    /**
     * Fetch the *extended* MUC info from the server and cache it locally
     * https://xmpp.org/extensions/xep-0045.html#disco-roominfo
     * @private
     * @method MUC#getDiscoInfo
     * @returns {Promise}
     */
    private getDiscoInfo;
    /**
     * Fetch the *extended* MUC info fields from the server and store them locally
     * in the `config` {@link Model} attribute.
     * See: https://xmpp.org/extensions/xep-0045.html#disco-roominfo
     * @private
     * @method MUC#getDiscoInfoFields
     * @returns {Promise}
     */
    private getDiscoInfoFields;
    /**
     * Use converse-disco to populate the features {@link Model} which
     * is stored as an attibute on this {@link MUC}.
     * The results may be cached. If you want to force fetching the features from the
     * server, call {@link MUC#refreshDiscoInfo} instead.
     * @private
     * @returns {Promise}
     */
    private getDiscoInfoFeatures;
    /**
     * Given a <field> element, return a copy with a <value> child if
     * we can find a value for it in this rooms config.
     * @private
     * @method MUC#addFieldValue
     * @param {Element} field
     * @returns {Element}
     */
    private addFieldValue;
    /**
     * Automatically configure the groupchat based on this model's
     * 'roomconfig' data.
     * @private
     * @method MUC#autoConfigureChatRoom
     * @returns {Promise<Element>}
     * Returns a promise which resolves once a response IQ has
     * been received.
     */
    private autoConfigureChatRoom;
    /**
     * Send an IQ stanza to fetch the groupchat configuration data.
     * Returns a promise which resolves once the response IQ
     * has been received.
     * @private
     * @method MUC#fetchRoomConfiguration
     * @returns { Promise<Element> }
     */
    private fetchRoomConfiguration;
    /**
     * Sends an IQ stanza with the groupchat configuration.
     * @private
     * @method MUC#sendConfiguration
     * @param { Array } config - The groupchat configuration
     * @returns { Promise<Element> } - A promise which resolves with
     * the `result` stanza received from the XMPP server.
     */
    private sendConfiguration;
    onCommandError(err: any): void;
    getNickOrJIDFromCommandArgs(args: any): any;
    validateRoleOrAffiliationChangeArgs(command: any, args: any): boolean;
    getAllowedCommands(): string[];
    verifyAffiliations(affiliations: any, occupant: any, show_error?: boolean): boolean;
    verifyRoles(roles: any, occupant: any, show_error?: boolean): boolean;
    /**
     * Returns the `role` which the current user has in this MUC
     * @private
     * @method MUC#getOwnRole
     * @returns { ('none'|'visitor'|'participant'|'moderator') }
     */
    private getOwnRole;
    /**
     * Returns the `affiliation` which the current user has in this MUC
     * @private
     * @method MUC#getOwnAffiliation
     * @returns { ('none'|'outcast'|'member'|'admin'|'owner') }
     */
    private getOwnAffiliation;
    /**
     * Get the {@link MUCOccupant} instance which
     * represents the current user.
     * @method MUC#getOwnOccupant
     * @returns {MUCOccupant}
     */
    getOwnOccupant(): MUCOccupant;
    /**
     * Send a presence stanza to update the user's nickname in this MUC.
     * @param { String } nick
     */
    setNickname(nick: string): Promise<void>;
    /**
     * Send an IQ stanza to modify an occupant's role
     * @method MUC#setRole
     * @param {MUCOccupant} occupant
     * @param {string} role
     * @param {string} reason
     * @param {function} onSuccess - callback for a succesful response
     * @param {function} onError - callback for an error response
     */
    setRole(occupant: MUCOccupant, role: string, reason: string, onSuccess: Function, onError: Function): any;
    /**
     * @method MUC#getOccupant
     * @param {string} nickname_or_jid - The nickname or JID of the occupant to be returned
     * @returns {MUCOccupant}
     */
    getOccupant(nickname_or_jid: string): MUCOccupant;
    /**
     * Return an array of occupant models that have the required role
     * @method MUC#getOccupantsWithRole
     * @param {string} role
     * @returns {{jid: string, nick: string, role: string}[]}
     */
    getOccupantsWithRole(role: string): {
        jid: string;
        nick: string;
        role: string;
    }[];
    /**
     * Return an array of occupant models that have the required affiliation
     * @method MUC#getOccupantsWithAffiliation
     * @param {string} affiliation
     * @returns {{jid: string, nick: string, affiliation: string}[]}
     */
    getOccupantsWithAffiliation(affiliation: string): {
        jid: string;
        nick: string;
        affiliation: string;
    }[];
    /**
     * Return an array of occupant models, sorted according to the passed-in attribute.
     * @private
     * @method MUC#getOccupantsSortedBy
     * @param {string} attr - The attribute to sort the returned array by
     * @returns {MUCOccupant[]}
     */
    private getOccupantsSortedBy;
    /**
     * Fetch the lists of users with the given affiliations.
     * Then compute the delta between those users and
     * the passed in members, and if it exists, send the delta
     * to the XMPP server to update the member list.
     * @private
     * @method MUC#updateMemberLists
     * @param {object} members - Map of member jids and affiliations.
     * @returns {Promise}
     *  A promise which is resolved once the list has been
     *  updated or once it's been established there's no need
     *  to update the list.
     */
    private updateMemberLists;
    /**
     * Given a nick name, save it to the model state, otherwise, look
     * for a server-side reserved nickname or default configured
     * nickname and if found, persist that to the model state.
     * @method MUC#getAndPersistNickname
     * @param {string} nick
     * @returns {Promise<string>} A promise which resolves with the nickname
     */
    getAndPersistNickname(nick: string): Promise<string>;
    /**
     * Use service-discovery to ask the XMPP server whether
     * this user has a reserved nickname for this groupchat.
     * If so, we'll use that, otherwise we render the nickname form.
     * @private
     * @method MUC#getReservedNick
     * @returns { Promise<string> } A promise which resolves with the reserved nick or null
     */
    private getReservedNick;
    /**
     * Send an IQ stanza to the MUC to register this user's nickname.
     * This sets the user's affiliation to 'member' (if they weren't affiliated
     * before) and reserves the nickname for this user, thereby preventing other
     * users from using it in this MUC.
     * See https://xmpp.org/extensions/xep-0045.html#register
     * @private
     * @method MUC#registerNickname
     */
    private registerNickname;
    /**
     * Check whether we should unregister the user from this MUC, and if so,
     * call { @link MUC#sendUnregistrationIQ }
     * @method MUC#unregisterNickname
     */
    unregisterNickname(): Promise<void>;
    /**
     * Send an IQ stanza to the MUC to unregister this user's nickname.
     * If the user had a 'member' affiliation, it'll be removed and their
     * nickname will no longer be reserved and can instead be used (and
     * registered) by other users.
     * @method MUC#sendUnregistrationIQ
     */
    sendUnregistrationIQ(): any;
    /**
     * Given a presence stanza, update the occupant model based on its contents.
     * @private
     * @method MUC#updateOccupantsOnPresence
     * @param { Element } pres - The presence stanza
     */
    private updateOccupantsOnPresence;
    fetchFeaturesIfConfigurationChanged(stanza: any): void;
    /**
     * Given two JIDs, which can be either user JIDs or MUC occupant JIDs,
     * determine whether they belong to the same user.
     * @method MUC#isSameUser
     * @param { String } jid1
     * @param { String } jid2
     * @returns { Boolean }
     */
    isSameUser(jid1: string, jid2: string): boolean;
    isSubjectHidden(): Promise<any>;
    toggleSubjectHiddenState(): Promise<void>;
    /**
     * Handle a possible subject change and return `true` if so.
     * @private
     * @method MUC#handleSubjectChange
     * @param { object } attrs - Attributes representing a received
     *  message, as returned by {@link parseMUCMessage}
     */
    private handleSubjectChange;
    /**
     * Set the subject for this {@link MUC}
     * @private
     * @method MUC#setSubject
     * @param { String } value
     */
    private setSubject;
    /**
     * Is this a chat state notification that can be ignored,
     * because it's old or because it's from us.
     * @private
     * @method MUC#ignorableCSN
     * @param { Object } attrs - The message attributes
     */
    private ignorableCSN;
    /**
     * Determines whether the message is from ourselves by checking
     * the `from` attribute. Doesn't check the `type` attribute.
     * @method MUC#isOwnMessage
     * @param {Object|Element|MUCMessage} msg
     * @returns {boolean}
     */
    isOwnMessage(msg: any | Element | MUCMessage): boolean;
    /**
     * Send a MUC-0410 MUC Self-Ping stanza to room to determine
     * whether we're still joined.
     * @async
     * @private
     * @method MUC#isJoined
     * @returns {Promise<boolean>}
     */
    private isJoined;
    /**
     * Sends a status update presence (i.e. based on the `<show>` element)
     * @method MUC#sendStatusPresence
     * @param { String } type
     * @param { String } [status] - An optional status message
     * @param { Element[]|Builder[]|Element|Builder } [child_nodes]
     *  Nodes(s) to be added as child nodes of the `presence` XML element.
     */
    sendStatusPresence(type: string, status?: string, child_nodes?: Element[] | Builder[] | Element | Builder): Promise<void>;
    /**
     * Check whether we're still joined and re-join if not
     * @method MUC#rejoinIfNecessary
     */
    rejoinIfNecessary(): Promise<boolean>;
    /**
     * Looks whether we already have a moderation message for this
     * incoming message. If so, it's considered "dangling" because
     * it probably hasn't been applied to anything yet, given that
     * the relevant message is only coming in now.
     * @private
     * @method MUC#findDanglingModeration
     * @param { object } attrs - Attributes representing a received
     *  message, as returned by {@link parseMUCMessage}
     * @returns {MUCMessage}
     */
    private findDanglingModeration;
    /**
     * Handles message moderation based on the passed in attributes.
     * @private
     * @method MUC#handleModeration
     * @param {object} attrs - Attributes representing a received
     *  message, as returned by {@link parseMUCMessage}
     * @returns {Promise<boolean>} Returns `true` or `false` depending on
     *  whether a message was moderated or not.
     */
    private handleModeration;
    /**
     * @param { String } actor - The nickname of the actor that caused the notification
     * @param {String|Array<String>} states - The state or states representing the type of notificcation
     */
    removeNotification(actor: string, states: string | Array<string>): void;
    /**
     * Update the notifications model by adding the passed in nickname
     * to the array of nicknames that all match a particular state.
     *
     * Removes the nickname from any other states it might be associated with.
     *
     * The state can be a XEP-0085 Chat State or a XEP-0045 join/leave
     * state.
     * @param { String } actor - The nickname of the actor that causes the notification
     * @param { String } state - The state representing the type of notificcation
     */
    updateNotifications(actor: string, state: string): void;
    handleMetadataFastening(attrs: any): boolean;
    /**
     * Given {@link MessageAttributes} look for XEP-0316 Room Notifications and create info
     * messages for them.
     * @param {MessageAttributes} attrs
     */
    handleMEPNotification(attrs: MessageAttributes): boolean;
    /**
     * Returns an already cached message (if it exists) based on the
     * passed in attributes map.
     * @method MUC#getDuplicateMessage
     * @param {object} attrs - Attributes representing a received
     *  message, as returned by {@link parseMUCMessage}
     * @returns {MUCMessage}
     */
    getDuplicateMessage(attrs: object): MUCMessage;
    /**
     * Handler for all MUC messages sent to this groupchat. This method
     * shouldn't be called directly, instead {@link MUC#queueMessage}
     * should be called.
     * @method MUC#onMessage
     * @param {MessageAttributes} attrs - A promise which resolves to the message attributes.
     */
    onMessage(attrs: MessageAttributes): Promise<void>;
    /**
     * @param {Element} pres
     */
    handleModifyError(pres: Element): void;
    /**
     * Handle a presence stanza that disconnects the user from the MUC
     * @param { Element } stanza
     */
    handleDisconnection(stanza: Element): void;
    getActionInfoMessage(code: any, nick: any, actor: any): any;
    createAffiliationChangeMessage(occupant: any): void;
    createRoleChangeMessage(occupant: any, changed: any): void;
    /**
     * Create an info message based on a received MUC status code
     * @private
     * @method MUC#createInfoMessage
     * @param { string } code - The MUC status code
     * @param { Element } stanza - The original stanza that contains the code
     * @param { Boolean } is_self - Whether this stanza refers to our own presence
     */
    private createInfoMessage;
    /**
     * Create info messages based on a received presence or message stanza
     * @private
     * @method MUC#createInfoMessages
     * @param { Element } stanza
     */
    private createInfoMessages;
    /**
     * Set parameters regarding disconnection from this room. This helps to
     * communicate to the user why they were disconnected.
     * @param {string} message - The disconnection message, as received from (or
     *  implied by) the server.
     * @param {string} [reason] - The reason provided for the disconnection
     * @param {string} [actor] - The person (if any) responsible for this disconnection
     * @param {number} [status] - The status code (see `ROOMSTATUS`)
     */
    setDisconnectionState(message: string, reason?: string, actor?: string, status?: number): void;
    /**
     * @param {Element} presence
     */
    onNicknameClash(presence: Element): void;
    /**
     * Parses a <presence> stanza with type "error" and sets the proper
     * `connection_status` value for this {@link MUC} as
     * well as any additional output that can be shown to the user.
     * @private
     * @param { Element } stanza - The presence stanza
     */
    private onErrorPresence;
    /**
     * Listens for incoming presence stanzas from the service that hosts this MUC
     * @private
     * @method MUC#onPresenceFromMUCHost
     * @param { Element } stanza - The presence stanza
     */
    private onPresenceFromMUCHost;
    /**
     * Handles incoming presence stanzas coming from the MUC
     * @private
     * @method MUC#onPresence
     * @param { Element } stanza
     */
    private onPresence;
    /**
     * Handles a received presence relating to the current user.
     *
     * For locked groupchats (which are by definition "new"), the
     * groupchat will either be auto-configured or created instantly
     * (with default config) or a configuration groupchat will be
     * rendered.
     *
     * If the groupchat is not locked, then the groupchat will be
     * auto-configured only if applicable and if the current
     * user is the groupchat's owner.
     * @private
     * @method MUC#onOwnPresence
     * @param {Element} stanza - The stanza
     */
    private onOwnPresence;
    /**
     * Returns a boolean to indicate whether the current user
     * was mentioned in a message.
     * @method MUC#isUserMentioned
     * @param {MUCMessage} message - The text message
     */
    isUserMentioned(message: MUCMessage): any;
    incrementUnreadMsgsCounter(message: any): void;
}
import ChatBox from '../chat/model.js';
declare class MUCSession extends Model {
    defaults(): {
        connection_status: number;
    };
}
import { Model } from '@converse/skeletor';
//# sourceMappingURL=muc.d.ts.map