export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<Role>;
  user: User;
  userId?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type Audience = {
  __typename?: 'Audience';
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<Role>;
  ticket?: Maybe<Array<Ticket>>;
  user: User;
  userId?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type CreateAdminInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  userId?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type CreateAudienceInput = {
  email: Scalars['String']['input'];
  fullname?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role: Role;
  userId?: InputMaybe<Scalars['ID']['input']>;
  username: Scalars['String']['input'];
};

export type CreateEventInput = {
  category: EventCategory;
  description: Scalars['String']['input'];
  endTime: Scalars['DateTime']['input'];
  organizer?: InputMaybe<CreateOrganizerInput>;
  organizerId: Scalars['String']['input'];
  startTime: Scalars['DateTime']['input'];
  ticket?: InputMaybe<Array<CreateTicketInput>>;
  ticketType?: InputMaybe<Array<CreateTickettypeInput>>;
  title: Scalars['String']['input'];
  venueId: Scalars['ID']['input'];
};

export type CreateOrderInput = {
  item: OrderCategory;
  itemId: Array<Scalars['String']['input']>;
  payment?: InputMaybe<CreatePaymentInput>;
  paymentId: Scalars['String']['input'];
  total: Scalars['Int']['input'];
};

export type CreateOrganizerInput = {
  email: Scalars['String']['input'];
  event?: InputMaybe<Array<CreateEventInput>>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role: Role;
  userId?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  venue?: InputMaybe<Array<CreateVenueInput>>;
};

export type CreatePaymentInput = {
  amount: Scalars['Int']['input'];
  orderId?: InputMaybe<Scalars['String']['input']>;
  status: Status;
  userId: Scalars['String']['input'];
};

export type CreateSeatInput = {
  column?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['String']['input'];
  holdExpiresAt?: InputMaybe<Scalars['String']['input']>;
  holdId?: InputMaybe<Scalars['String']['input']>;
  row?: InputMaybe<Scalars['String']['input']>;
  seatNo: Scalars['Int']['input'];
  status: SeatStatus;
  typeId: Scalars['String']['input'];
};

export type CreateTicketInput = {
  eventId: Scalars['String']['input'];
  isUsed: Scalars['Boolean']['input'];
  qrcode: Scalars['String']['input'];
  seatId: Scalars['String']['input'];
  seatNo: Scalars['Int']['input'];
  typeId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateTickettypeInput = {
  event?: InputMaybe<CreateVenueInput>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  name: Name;
  price: Scalars['Int']['input'];
  qty: Scalars['Int']['input'];
  ticket?: InputMaybe<Array<CreateTicketInput>>;
};

export type CreateUserInput = {
  admin?: InputMaybe<CreateAdminInput>;
  audience?: InputMaybe<CreateAudienceInput>;
  email: Scalars['String']['input'];
  organizer?: InputMaybe<CreateOrganizerInput>;
  password: Scalars['String']['input'];
};

export type CreateVenueInput = {
  address: Scalars['String']['input'];
  capacity: Scalars['Int']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  event?: InputMaybe<Array<CreateEventInput>>;
  name: Scalars['String']['input'];
  organizer?: InputMaybe<Array<CreateOrganizerInput>>;
  state: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  category: EventCategory;
  description: Scalars['String']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  organizer: Organizer;
  organizerId?: Maybe<Scalars['ID']['output']>;
  startTime: Scalars['DateTime']['output'];
  ticket: Array<Ticket>;
  ticketType: Array<TicketType>;
  title: Scalars['String']['output'];
  venue: Venue;
  venueId?: Maybe<Scalars['ID']['output']>;
};

/** All categoryies of the event */
export enum EventCategory {
  Music = 'MUSIC',
  Sport = 'SPORT',
  Tech = 'TECH'
}

export type EventFilter = {
  category?: InputMaybe<EventCategory>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FilteredEvent = {
  __typename?: 'FilteredEvent';
  category?: Maybe<EventCategory>;
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  organizer?: Maybe<Organizer>;
  organizerId?: Maybe<Scalars['ID']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  ticket?: Maybe<Array<Ticket>>;
  ticketType?: Maybe<Array<TicketType>>;
  title?: Maybe<Scalars['String']['output']>;
  venue?: Maybe<Venue>;
  venueId?: Maybe<Scalars['ID']['output']>;
};

export type HoldingInfo = {
  __typename?: 'HoldingInfo';
  holdId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdmin: Admin;
  createAudience: Audience;
  createEvent: Event;
  createOrder: Order;
  createOrganizer: Organizer;
  createPayment: Payment;
  createSeats: Array<Seat>;
  createTicket: Ticket;
  createTickettype: TicketType;
  createUser: User;
  createVenue: Venue;
  removeAdmin: Admin;
  removeAudience: Audience;
  removeEvent: Event;
  removeOrder: Order;
  removeOrganizer: Organizer;
  removePayment: Payment;
  removeSeat: Seat;
  removeTicket: Ticket;
  removeTickettype: TicketType;
  removeUser: User;
  removeVenue: Venue;
  reserveSeats: HoldingInfo;
  updateAdmin: Admin;
  updateAudience: Audience;
  updateEvent: Event;
  updateOrder: Order;
  updateOrganizer: Organizer;
  updatePayment: Payment;
  updateSeat: Seat;
  updateTicket: Ticket;
  updateTickettype: TicketType;
  updateUser: User;
  updateVenue: Venue;
};


export type MutationCreateAdminArgs = {
  createAdminInput: CreateAdminInput;
};


export type MutationCreateAudienceArgs = {
  createAudienceInput: CreateAudienceInput;
};


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateOrganizerArgs = {
  createOrganizerInput: CreateOrganizerInput;
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreateSeatsArgs = {
  createSeatInput: Array<CreateSeatInput>;
};


export type MutationCreateTicketArgs = {
  createTicketInput: CreateTicketInput;
};


export type MutationCreateTickettypeArgs = {
  createTickettypeInput: CreateTickettypeInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateVenueArgs = {
  createVenueInput: CreateVenueInput;
};


export type MutationRemoveAdminArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveAudienceArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveEventArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveOrderArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveOrganizerArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePaymentArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSeatArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTicketArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTickettypeArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveVenueArgs = {
  id: Scalars['String']['input'];
};


export type MutationReserveSeatsArgs = {
  reserveSeatinput: ReserveSeatInput;
};


export type MutationUpdateAdminArgs = {
  updateAdminInput: UpdateAdminInput;
};


export type MutationUpdateAudienceArgs = {
  updateAudienceInput: UpdateAudienceInput;
};


export type MutationUpdateEventArgs = {
  updateEventInput: UpdateEventInput;
};


export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdateOrganizerArgs = {
  updateOrganizerInput: UpdateOrganizerInput;
};


export type MutationUpdatePaymentArgs = {
  updatePaymentInput: UpdatePaymentInput;
};


export type MutationUpdateSeatArgs = {
  updateSeatInput: UpdateSeatInput;
};


export type MutationUpdateTicketArgs = {
  updateTicketInput: UpdateTicketInput;
};


export type MutationUpdateTickettypeArgs = {
  updateTickettypeInput: UpdateTickettypeInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateVenueArgs = {
  updateVenueInput: UpdateVenueInput;
};

/** Names of all the ticket tiers */
export enum Name {
  Regular = 'REGULAR',
  Student = 'STUDENT',
  Vip = 'VIP',
  Vvip = 'VVIP'
}

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID']['output'];
  item: OrderCategory;
  itemId: Array<Scalars['String']['output']>;
  payment: Payment;
  total: Scalars['Int']['output'];
};

/** Category of the order, e.g(ticket, merch) */
export enum OrderCategory {
  Merch = 'MERCH',
  Ticket = 'TICKET'
}

export type Organizer = {
  __typename?: 'Organizer';
  event: Array<Event>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  user: User;
  userId?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  venue: Array<Venue>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  holdId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  order: Order;
  orderId: Scalars['String']['output'];
  paidAt: Scalars['DateTime']['output'];
  status: Status;
};

export type Query = {
  __typename?: 'Query';
  admin: Admin;
  admins: Array<Admin>;
  audience: Audience;
  audiences: Array<Audience>;
  event: Event;
  events: Array<Event>;
  filterEvent?: Maybe<Array<FilteredEvent>>;
  order: Order;
  orders: Array<Order>;
  organizer: Organizer;
  organizers: Array<Organizer>;
  payment: Payment;
  payments: Array<Payment>;
  seat: Seat;
  seats: Array<Seat>;
  ticket: Ticket;
  tickets: Array<Ticket>;
  tickettype: TicketType;
  tickettypes: Array<TicketType>;
  user: User;
  users: Array<User>;
  venue: Venue;
  venues: Array<Venue>;
};


export type QueryAdminArgs = {
  id: Scalars['String']['input'];
};


export type QueryAudienceArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventArgs = {
  id: Scalars['String']['input'];
};


export type QueryFilterEventArgs = {
  filterEventInput: EventFilter;
};


export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrganizerArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['String']['input'];
};


export type QuerySeatArgs = {
  id: Scalars['String']['input'];
};


export type QueryTicketArgs = {
  id: Scalars['String']['input'];
};


export type QueryTickettypeArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryVenueArgs = {
  id: Scalars['String']['input'];
};

export type ReserveSeatInput = {
  eventId: Scalars['String']['input'];
  seatIds: Array<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

/** Role assigned to the user */
export enum Role {
  Admin = 'ADMIN',
  Audience = 'AUDIENCE',
  Organizer = 'ORGANIZER'
}

export type Seat = {
  __typename?: 'Seat';
  column?: Maybe<Scalars['String']['output']>;
  eventId: Scalars['String']['output'];
  holdExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  holdId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  row?: Maybe<Scalars['String']['output']>;
  seatNo: Scalars['Int']['output'];
  status: SeatStatus;
  typeId: Scalars['String']['output'];
};

/** Status of the seat */
export enum SeatStatus {
  Available = 'AVAILABLE',
  Reserved = 'RESERVED',
  Sold = 'SOLD'
}

/** Status of the order */
export enum Status {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Successful = 'SUCCESSFUL'
}

export type Ticket = {
  __typename?: 'Ticket';
  audience?: Maybe<Audience>;
  audienceId?: Maybe<Scalars['String']['output']>;
  event: Event;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isUsed: Scalars['Boolean']['output'];
  qrcode: Scalars['String']['output'];
  type: TicketType;
  typeId: Scalars['String']['output'];
  user: User;
};

export type TicketType = {
  __typename?: 'TicketType';
  event: Event;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Name;
  price: Scalars['Int']['output'];
  qty: Scalars['Int']['output'];
  ticket: Array<Ticket>;
};

export type UpdateAdminInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  userId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAudienceInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventInput = {
  category?: InputMaybe<EventCategory>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  organizer?: InputMaybe<CreateOrganizerInput>;
  organizerId?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  ticket?: InputMaybe<Array<CreateTicketInput>>;
  ticketType?: InputMaybe<Array<CreateTickettypeInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
  venueId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOrderInput = {
  id: Scalars['String']['input'];
  item?: InputMaybe<OrderCategory>;
  itemId?: InputMaybe<Array<Scalars['String']['input']>>;
  payment?: InputMaybe<CreatePaymentInput>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOrganizerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<Array<CreateEventInput>>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  userId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  venue?: InputMaybe<Array<CreateVenueInput>>;
};

export type UpdatePaymentInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  orderId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSeatInput = {
  column?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  holdExpiresAt?: InputMaybe<Scalars['String']['input']>;
  holdId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  row?: InputMaybe<Scalars['String']['input']>;
  seatNo?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SeatStatus>;
  typeId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTicketInput = {
  eventId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isUsed?: InputMaybe<Scalars['Boolean']['input']>;
  qrcode?: InputMaybe<Scalars['String']['input']>;
  seatId?: InputMaybe<Scalars['String']['input']>;
  seatNo?: InputMaybe<Scalars['Int']['input']>;
  typeId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTickettypeInput = {
  event?: InputMaybe<CreateVenueInput>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Name>;
  price?: InputMaybe<Scalars['Int']['input']>;
  qty?: InputMaybe<Scalars['Int']['input']>;
  ticket?: InputMaybe<Array<CreateTicketInput>>;
};

export type UpdateUserInput = {
  admin?: InputMaybe<CreateAdminInput>;
  audience?: InputMaybe<CreateAudienceInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  organizer?: InputMaybe<CreateOrganizerInput>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVenueInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['Int']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<Array<CreateEventInput>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organizer?: InputMaybe<Array<CreateOrganizerInput>>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  admin: Admin;
  audience: Audience;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  lastKnownDevice?: Maybe<Scalars['String']['output']>;
  lastLoginIp?: Maybe<Scalars['String']['output']>;
  organizer: Organizer;
  provider: Scalars['String']['output'];
  speakeasySecret?: Maybe<Scalars['String']['output']>;
  twofaVerified: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  verificationToken?: Maybe<Scalars['String']['output']>;
};

export type Venue = {
  __typename?: 'Venue';
  address: Scalars['String']['output'];
  capacity: Scalars['Int']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  event: Array<Event>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizer: Array<Organizer>;
  state: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};
