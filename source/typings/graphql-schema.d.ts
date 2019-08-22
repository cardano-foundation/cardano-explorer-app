export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
};

/** expression to compare columns of type boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};

/** conflict action */
export enum Conflict_Action {
  /** ignore the insert on this row */
  Ignore = 'ignore',
  /** update the row with the given values */
  Update = 'update',
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "todo_lists" */
  delete_todo_lists?: Maybe<Todo_Lists_Mutation_Response>;
  /** delete data from the table: "todos" */
  delete_todos?: Maybe<Todos_Mutation_Response>;
  /** insert data into the table: "todo_lists" */
  insert_todo_lists?: Maybe<Todo_Lists_Mutation_Response>;
  /** insert data into the table: "todos" */
  insert_todos?: Maybe<Todos_Mutation_Response>;
  /** update data of the table: "todo_lists" */
  update_todo_lists?: Maybe<Todo_Lists_Mutation_Response>;
  /** update data of the table: "todos" */
  update_todos?: Maybe<Todos_Mutation_Response>;
};

/** mutation root */
export type Mutation_RootDelete_Todo_ListsArgs = {
  where: Todo_Lists_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_TodosArgs = {
  where: Todos_Bool_Exp;
};

/** mutation root */
export type Mutation_RootInsert_Todo_ListsArgs = {
  objects: Array<Todo_Lists_Insert_Input>;
  on_conflict?: Maybe<Todo_Lists_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_TodosArgs = {
  objects: Array<Todos_Insert_Input>;
  on_conflict?: Maybe<Todos_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_Todo_ListsArgs = {
  _set?: Maybe<Todo_Lists_Set_Input>;
  where: Todo_Lists_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_TodosArgs = {
  _set?: Maybe<Todos_Set_Input>;
  where: Todos_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "todo_lists" */
  todo_lists: Array<Todo_Lists>;
  /** fetch aggregated fields from the table: "todo_lists" */
  todo_lists_aggregate: Todo_Lists_Aggregate;
  /** fetch data from the table: "todo_lists" using primary key columns */
  todo_lists_by_pk?: Maybe<Todo_Lists>;
  /** fetch data from the table: "todos" */
  todos: Array<Todos>;
  /** fetch aggregated fields from the table: "todos" */
  todos_aggregate: Todos_Aggregate;
  /** fetch data from the table: "todos" using primary key columns */
  todos_by_pk?: Maybe<Todos>;
};

/** query root */
export type Query_RootTodo_ListsArgs = {
  distinct_on?: Maybe<Array<Todo_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Todo_Lists_Order_By>>;
  where?: Maybe<Todo_Lists_Bool_Exp>;
};

/** query root */
export type Query_RootTodo_Lists_AggregateArgs = {
  distinct_on?: Maybe<Array<Todo_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Todo_Lists_Order_By>>;
  where?: Maybe<Todo_Lists_Bool_Exp>;
};

/** query root */
export type Query_RootTodo_Lists_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootTodosArgs = {
  distinct_on?: Maybe<Array<Todos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Todos_Order_By>>;
  where?: Maybe<Todos_Bool_Exp>;
};

/** query root */
export type Query_RootTodos_AggregateArgs = {
  distinct_on?: Maybe<Array<Todos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Todos_Order_By>>;
  where?: Maybe<Todos_Bool_Exp>;
};

/** query root */
export type Query_RootTodos_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "todo_lists" */
  todo_lists: Array<Todo_Lists>;
  /** fetch aggregated fields from the table: "todo_lists" */
  todo_lists_aggregate: Todo_Lists_Aggregate;
  /** fetch data from the table: "todo_lists" using primary key columns */
  todo_lists_by_pk?: Maybe<Todo_Lists>;
  /** fetch data from the table: "todos" */
  todos: Array<Todos>;
  /** fetch aggregated fields from the table: "todos" */
  todos_aggregate: Todos_Aggregate;
  /** fetch data from the table: "todos" using primary key columns */
  todos_by_pk?: Maybe<Todos>;
};

/** subscription root */
export type Subscription_RootTodo_ListsArgs = {
  distinct_on?: Maybe<Array<Todo_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Todo_Lists_Order_By>>;
  where?: Maybe<Todo_Lists_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootTodo_Lists_AggregateArgs = {
  distinct_on?: Maybe<Array<Todo_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Todo_Lists_Order_By>>;
  where?: Maybe<Todo_Lists_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootTodo_Lists_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootTodosArgs = {
  distinct_on?: Maybe<Array<Todos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Todos_Order_By>>;
  where?: Maybe<Todos_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootTodos_AggregateArgs = {
  distinct_on?: Maybe<Array<Todos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Todos_Order_By>>;
  where?: Maybe<Todos_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootTodos_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "todo_lists" */
export type Todo_Lists = {
  __typename?: 'todo_lists';
  id: Scalars['uuid'];
  title: Scalars['String'];
};

/** aggregated selection of "todo_lists" */
export type Todo_Lists_Aggregate = {
  __typename?: 'todo_lists_aggregate';
  aggregate?: Maybe<Todo_Lists_Aggregate_Fields>;
  nodes: Array<Todo_Lists>;
};

/** aggregate fields of "todo_lists" */
export type Todo_Lists_Aggregate_Fields = {
  __typename?: 'todo_lists_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Todo_Lists_Max_Fields>;
  min?: Maybe<Todo_Lists_Min_Fields>;
};

/** aggregate fields of "todo_lists" */
export type Todo_Lists_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Todo_Lists_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "todo_lists" */
export type Todo_Lists_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Todo_Lists_Max_Order_By>;
  min?: Maybe<Todo_Lists_Min_Order_By>;
};

/** input type for inserting array relation for remote table "todo_lists" */
export type Todo_Lists_Arr_Rel_Insert_Input = {
  data: Array<Todo_Lists_Insert_Input>;
  on_conflict?: Maybe<Todo_Lists_On_Conflict>;
};

/** Boolean expression to filter rows from the table "todo_lists". All fields are combined with a logical 'AND'. */
export type Todo_Lists_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Todo_Lists_Bool_Exp>>>;
  _not?: Maybe<Todo_Lists_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Todo_Lists_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  title?: Maybe<Varchar_Comparison_Exp>;
};

/** unique or primary key constraints on table "todo_lists" */
export enum Todo_Lists_Constraint {
  /** unique or primary key constraint */
  PkAbf14b565d762fb594a74fe6d71 = 'PK_abf14b565d762fb594a74fe6d71',
}

/** input type for inserting data into table "todo_lists" */
export type Todo_Lists_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Todo_Lists_Max_Fields = {
  __typename?: 'todo_lists_max_fields';
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "todo_lists" */
export type Todo_Lists_Max_Order_By = {
  title?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Todo_Lists_Min_Fields = {
  __typename?: 'todo_lists_min_fields';
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "todo_lists" */
export type Todo_Lists_Min_Order_By = {
  title?: Maybe<Order_By>;
};

/** response of any mutation on the table "todo_lists" */
export type Todo_Lists_Mutation_Response = {
  __typename?: 'todo_lists_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Todo_Lists>;
};

/** input type for inserting object relation for remote table "todo_lists" */
export type Todo_Lists_Obj_Rel_Insert_Input = {
  data: Todo_Lists_Insert_Input;
  on_conflict?: Maybe<Todo_Lists_On_Conflict>;
};

/** on conflict condition type for table "todo_lists" */
export type Todo_Lists_On_Conflict = {
  constraint: Todo_Lists_Constraint;
  update_columns: Array<Todo_Lists_Update_Column>;
};

/** ordering options when selecting data from "todo_lists" */
export type Todo_Lists_Order_By = {
  id?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** select columns of table "todo_lists" */
export enum Todo_Lists_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
}

/** input type for updating data in table "todo_lists" */
export type Todo_Lists_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** update columns of table "todo_lists" */
export enum Todo_Lists_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
}

/** columns and relationships of "todos" */
export type Todos = {
  __typename?: 'todos';
  id: Scalars['uuid'];
  isDone: Scalars['Boolean'];
  listId?: Maybe<Scalars['uuid']>;
  title: Scalars['String'];
  /** An object relationship */
  todo_list?: Maybe<Todo_Lists>;
};

/** aggregated selection of "todos" */
export type Todos_Aggregate = {
  __typename?: 'todos_aggregate';
  aggregate?: Maybe<Todos_Aggregate_Fields>;
  nodes: Array<Todos>;
};

/** aggregate fields of "todos" */
export type Todos_Aggregate_Fields = {
  __typename?: 'todos_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Todos_Max_Fields>;
  min?: Maybe<Todos_Min_Fields>;
};

/** aggregate fields of "todos" */
export type Todos_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Todos_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "todos" */
export type Todos_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Todos_Max_Order_By>;
  min?: Maybe<Todos_Min_Order_By>;
};

/** input type for inserting array relation for remote table "todos" */
export type Todos_Arr_Rel_Insert_Input = {
  data: Array<Todos_Insert_Input>;
  on_conflict?: Maybe<Todos_On_Conflict>;
};

/** Boolean expression to filter rows from the table "todos". All fields are combined with a logical 'AND'. */
export type Todos_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Todos_Bool_Exp>>>;
  _not?: Maybe<Todos_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Todos_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  isDone?: Maybe<Boolean_Comparison_Exp>;
  listId?: Maybe<Uuid_Comparison_Exp>;
  title?: Maybe<Varchar_Comparison_Exp>;
  todo_list?: Maybe<Todo_Lists_Bool_Exp>;
};

/** unique or primary key constraints on table "todos" */
export enum Todos_Constraint {
  /** unique or primary key constraint */
  PkCa8cafd59ca6faaf67995344225 = 'PK_ca8cafd59ca6faaf67995344225',
}

/** input type for inserting data into table "todos" */
export type Todos_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  isDone?: Maybe<Scalars['Boolean']>;
  listId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  todo_list?: Maybe<Todo_Lists_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Todos_Max_Fields = {
  __typename?: 'todos_max_fields';
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "todos" */
export type Todos_Max_Order_By = {
  title?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Todos_Min_Fields = {
  __typename?: 'todos_min_fields';
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "todos" */
export type Todos_Min_Order_By = {
  title?: Maybe<Order_By>;
};

/** response of any mutation on the table "todos" */
export type Todos_Mutation_Response = {
  __typename?: 'todos_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Todos>;
};

/** input type for inserting object relation for remote table "todos" */
export type Todos_Obj_Rel_Insert_Input = {
  data: Todos_Insert_Input;
  on_conflict?: Maybe<Todos_On_Conflict>;
};

/** on conflict condition type for table "todos" */
export type Todos_On_Conflict = {
  constraint: Todos_Constraint;
  update_columns: Array<Todos_Update_Column>;
};

/** ordering options when selecting data from "todos" */
export type Todos_Order_By = {
  id?: Maybe<Order_By>;
  isDone?: Maybe<Order_By>;
  listId?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  todo_list?: Maybe<Todo_Lists_Order_By>;
};

/** select columns of table "todos" */
export enum Todos_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDone = 'isDone',
  /** column name */
  ListId = 'listId',
  /** column name */
  Title = 'title',
}

/** input type for updating data in table "todos" */
export type Todos_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  isDone?: Maybe<Scalars['Boolean']>;
  listId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
};

/** update columns of table "todos" */
export enum Todos_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsDone = 'isDone',
  /** column name */
  ListId = 'listId',
  /** column name */
  Title = 'title',
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Maybe<Scalars['uuid']>>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Maybe<Scalars['uuid']>>>;
};

/** expression to compare columns of type varchar. All fields are combined with logical 'AND'. */
export type Varchar_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};
export type TodoListByIdSubscriptionVariables = {};

export type TodoListByIdSubscription = { __typename?: 'subscription_root' } & {
  todos: Array<
    { __typename?: 'todos' } & Pick<Todos, 'id' | 'title' | 'isDone'>
  >;
};
