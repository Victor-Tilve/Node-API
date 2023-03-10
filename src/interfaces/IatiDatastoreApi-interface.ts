/* Defining an interface for a function that takes an object of type IQueryParams and returns a promise
of type IIatiDatastoreApiResponse. */
export interface IIatiDatastoreApiRepository {
  fetchDataTransactionLast5Years: (params: IQueryParams) => Promise<IIatiDatastoreApiResponse>
}

/* Defining the type of the response that we will get from the API. */
export interface MonetaryAidResponse {
  [MonetaryAidYear: string]: {
    [organizationsAIdName: string]: number
  }
}

/* Defining an interface for an object that has a string as a key and a string as a value. */
export interface ICountryCode {
  [code: string]: string
}

/* Defining an interface for the currency code. */
export interface ICurrencyCode {
  [alphaCode: string]: {
    code: string
    alphaCode: string
    numericCode: string
    name: string
    rate: number
    date: string
    inverseRate: number
  }
}

/* Defining an interface for the query parameters. */
export interface IQueryParams {
  'collection'?: string
  'q': string
  'df'?: string
  'start': string
  'fq'?: string
  'rows': string
  'fl'?: string
}

/* Defining the interface for the response from the API. */
export interface IIatiDatastoreApiResponse {
  'responseHeader'?: {
    'zkConnected'?: boolean
    'status'?: number
    'QTime'?: number
    'params'?: IQueryParams
  }
  'response'?: IAPIResponse
}

/* Defining the interface for the API response. */
export interface IAPIResponse {
  'numFound'?: 0
  'start'?: 0
  'numFoundExact'?: false
  'docs'?: IIatiDatastoreApiDocs[]
}

/* Defining the interface for the API docs. */
export interface IIatiDatastoreApiDocs {
  'dataset_version'?: string
  'dataset_linked_data_default'?: string
  'dataset_generated_datetime'?: string
  'xml_lang'?: string
  'default_currency'?: string
  'last_updated_datetime'?: string
  'humanitarian'?: string
  'linked_data_uri'?: string
  'hierarchy'?: string
  'budget_not_provided'?: string
  'iati_identifier'?: string
  'reporting_org_ref'?: string
  'reporting_org_type'?: string
  'reporting_org_secondary_reporter'?: string
  'reporting_org_narrative'?: string[]
  'reporting_org_narrative_xml_lang'?: string[]
  'title_narrative'?: string[]
  'title_narrative_xml_lang'?: string[]
  'description_type'?: string[]
  'description_narrative'?: string[]
  'description_narrative_xml_lang'?: string[]
  'participating_org_ref'?: string[]
  'participating_org_role'?: string[]
  'participating_org_type'?: string[]
  'participating_org_activity_id'?: string[]
  'participating_org_crs_channel_code'?: string[]
  'participating_org_narrative'?: string[]
  'participating_org_narrative_xml_lang'?: string[]
  'other_identifier_ref'?: string
  'other_identifier_type'?: string
  'other_identifier_owner_org_ref'?: string
  'other_identifier_owner_org_narrative'?: string
  'activity_status_code'?: string
  'activity_date_iso_date'?: string[]
  'activity_date_type'?: string[]
  'activity_date_narrative'?: string[]
  'activity_date_narrative_xml_lang'?: string[]
  'contact_info_type'?: string
  'contact_info_organisation_narrative'?: string
  'contact_info_department_narrative'?: string
  'contact_info_person_name_narrative'?: string
  'contact_info_job_title_narrative'?: string
  'contact_info_telephone'?: string
  'contact_info_email'?: string
  'contact_info_website'?: string
  'contact_info_mailing_address_narrative'?: string
  'activity_scope_code'?: string
  'recipient_country_code'?: string[]
  'recipient_country_percentage'?: string[]
  'recipient_region_code'?: string[]
  'recipient_region_vocabulary'?: string[]
  'recipient_region_percentage'?: string[]
  'recipient_region_vocabulary_uri'?: string[]
  'location_ref'?: string[]
  'location_location_reach_code'?: string[]
  'location_location_id_vocabulary'?: string[]
  'location_location_id_code'?: string[]
  'location_name_narrative'?: string[]
  'location_description_narrative'?: string[]
  'location_activity_description_narrative'?: string[]
  'location_administrative_vocabulary'?: string[]
  'location_administrative_level'?: string[]
  'location_administrative_code'?: string[]
  'location_point_srsName'?: string[]
  'location_point_pos'?: string[]
  'location_exactness_code'?: string[]
  'location_location_class_code'?: string[]
  'location_feature_designation_code'?: string[]
  'sector_vocabulary'?: string[]
  'sector_code'?: string[]
  'sector_percentage'?: string[]
  'sector_vocabulary_uri'?: string[]
  'sector_narrative'?: string
  'tag_vocabulary'?: string[]
  'tag_code'?: string[]
  'tag_vocabulary_uri'?: string[]
  'tag_narrative'?: string[]
  'country_budget_items_vocabulary'?: string
  'country_budget_items_budget_item_code'?: string[]
  'country_budget_items_budget_item_percentage'?: string[]
  'country_budget_items_budget_item_description_narrative'?: string[]
  'humanitarian_scope_type'?: string[]
  'humanitarian_scope_vocabulary'?: string[]
  'humanitarian_scope_code'?: string[]
  'humanitarian_scope_vocabulary_uri'?: string[]
  'humanitarian_scope_narrative'?: string[]
  'humanitarian_scope_narrative_xml_lang'?: string[]
  'policy_marker_vocabulary'?: string[]
  'policy_marker_code'?: string[]
  'policy_marker_significance'?: string[]
  'policy_marker_vocabulary_uri'?: string[]
  'policy_marker_narrative'?: string
  'collaboration_type_code'?: string
  'default_flow_type_code'?: string
  'default_finance_type_code'?: string
  'default_aid_type_code'?: string[]
  'default_aid_type_vocabulary'?: string[]
  'default_tied_status_code'?: string
  'budget_type'?: string
  'budget_status'?: string
  'budget_period_start_iso_date'?: string
  'budget_period_end_iso_date'?: string
  'budget_value'?: string
  'budget_value_currency'?: string
  'budget_value_value_date'?: string
  'planned_disbursement_type'?: string[]
  'planned_disbursement_period_start_iso_date'?: string[]
  'planned_disbursement_period_end_iso_date'?: string[]
  'planned_disbursement_value'?: string[]
  'planned_disbursement_value_currency'?: string[]
  'planned_disbursement_value_value_date'?: string[]
  'planned_disbursement_provider_org_provider_activity_id'?: string
  'planned_disbursement_provider_org_type'?: string
  'planned_disbursement_provider_org_ref'?: string
  'planned_disbursement_provider_org_narrative'?: string
  'planned_disbursement_receiver_org_receiver_activity_id'?: string
  'planned_disbursement_receiver_org_type'?: string
  'planned_disbursement_receiver_org_ref'?: string
  'planned_disbursement_receiver_org_narrative'?: string
  'capital_spend_percentage'?: string
  'transaction_ref'?: string
  'transaction_humanitarian'?: string
  'transaction_transaction_type_code'?: string
  'transaction_transaction_date_iso_date'?: string
  'transaction_value'?: string
  'transaction_value_currency'?: string
  'transaction_value_value_date'?: string
  'transaction_description_narrative'?: string
  'transaction_provider_org_provider_activity_id'?: string
  'transaction_provider_org_type'?: string
  'transaction_provider_org_ref'?: string
  'transaction_provider_org_narrative'?: string
  'transaction_receiver_org_receiver_activity_id'?: string
  'transaction_receiver_org_type'?: string
  'transaction_receiver_org_ref'?: string
  'transaction_receiver_org_narrative'?: string
  'transaction_disbursement_channel_code'?: string
  'transaction_flow_type_code'?: string
  'transaction_finance_type_code'?: string
  'transaction_aid_type_code'?: string[]
  'transaction_aid_type_vocabulary'?: string[]
  'transaction_tied_status_code'?: string
  'document_link_format'?: string
  'document_link_url'?: string
  'document_link_title_narrative'?: string[]
  'document_link_title_narrative_xml_lang'?: string[]
  'document_link_description_narrative'?: string
  'document_link_category_code'?: string
  'document_link_language_code'?: string
  'document_link_document_date_iso_date'?: string
  'related_activity_ref'?: string
  'related_activity_type'?: string
  'legacy_data_name'?: string[]
  'legacy_data_value'?: string[]
  'legacy_data_iati_equivalent'?: string[]
  'conditions_attached'?: string
  'conditions_condition_type'?: string
  'conditions_condition_narrative'?: string[]
  'conditions_condition_narrative_xml_lang'?: string[]
  'result_type'?: string
  'result_aggregation_status'?: string
  'result_title_narrative'?: string
  'result_description_narrative'?: string
  'result_document_link_format'?: string
  'result_document_link_url'?: string
  'result_document_link_title_narrative'?: string
  'result_document_link_description_narrative'?: string
  'result_document_link_category_code'?: string
  'result_document_link_language_code'?: string
  'result_document_link_document_date_iso_date'?: string
  'result_indicator_measure'?: string
  'result_indicator_ascending'?: string
  'result_indicator_aggregation_status'?: string
  'result_indicator_title_narrative'?: string
  'result_indicator_description_narrative'?: string
  'result_indicator_document_link_format'?: string
  'result_indicator_document_link_url'?: string
  'result_indicator_document_link_title_narrative'?: string
  'result_indicator_document_link_description_narrative'?: string
  'result_indicator_document_link_category_code'?: string
  'result_indicator_document_link_language_code'?: string
  'result_indicator_document_link_document_date_iso_date'?: string
  'result_indicator_reference_vocabulary'?: string[]
  'result_indicator_reference_code'?: string[]
  'result_indicator_reference_indicator_uri'?: string[]
  'result_indicator_baseline_year'?: string
  'result_indicator_baseline_iso_date'?: string
  'result_indicator_baseline_value'?: string
  'result_indicator_baseline_location_ref'?: string[]
  'result_indicator_baseline_dimension_name'?: string[]
  'result_indicator_baseline_dimension_value'?: string[]
  'result_indicator_baseline_document_link_format'?: string
  'result_indicator_baseline_document_link_url'?: string
  'result_indicator_baseline_document_link_title_narrative'?: string
  'result_indicator_baseline_document_link_description_narrative'?: string
  'result_indicator_baseline_document_link_category_code'?: string
  'result_indicator_baseline_document_link_language_code'?: string
  'result_indicator_baseline_document_link_document_date_iso_date'?: string
  'result_indicator_baseline_comment_narrative'?: string
  'result_indicator_period_period_start_iso_date'?: string
  'result_indicator_period_period_end_iso_date'?: string
  'result_indicator_period_target_value'?: string
  'result_indicator_period_target_location_ref'?: string[]
  'result_indicator_period_target_dimension_name'?: string[]
  'result_indicator_period_target_dimension_value'?: string[]
  'result_indicator_period_target_comment_narrative'?: string
  'result_indicator_period_target_document_link_format'?: string
  'result_indicator_period_target_document_link_url'?: string
  'result_indicator_period_target_document_link_title_narrative'?: string
  'result_indicator_period_target_document_link_description_narrative'?: string
  'result_indicator_period_target_document_link_category_code'?: string
  'result_indicator_period_target_document_link_language_code'?: string
  'result_indicator_period_target_document_link_document_date_iso_date'?: string
  'result_indicator_period_actual_value'?: string
  'result_indicator_period_actual_location_ref'?: string[]
  'result_indicator_period_actual_dimension_name'?: string[]
  'result_indicator_period_actual_dimension_value'?: string[]
  'result_indicator_period_actual_comment_narrative'?: string
  'result_indicator_period_actual_document_link_format'?: string
  'result_indicator_period_actual_document_link_url'?: string
  'result_indicator_period_actual_document_link_title_narrative'?: string
  'result_indicator_period_actual_document_link_description_narrative'?: string
  'result_indicator_period_actual_document_link_category_code'?: string
  'result_indicator_period_actual_document_link_language_code'?: string
  'result_indicator_period_actual_document_link_document_date_iso_date'?: string
  'crs_add_other_flags_code'?: string
  'crs_add_other_flags_significance'?: string
  'crs_add_loan_terms_rate_1'?: string
  'crs_add_loan_terms_rate_2'?: string
  'crs_add_loan_terms_repayment_type_code'?: string
  'crs_add_loan_terms_repayment_plan_code'?: string
  'crs_add_loan_terms_commitment_date_iso_date'?: string
  'crs_add_loan_terms_repayment_first_date_iso_date'?: string
  'crs_add_loan_terms_repayment_final_date_iso_date'?: string
  'crs_add_loan_status_year'?: string
  'crs_add_loan_status_currency'?: string
  'crs_add_loan_status_value_date'?: string
  'crs_add_loan_status_interest_received'?: string
  'crs_add_loan_status_principal_outstanding'?: string
  'crs_add_loan_status_principal_arrears'?: string
  'crs_add_loan_status_interest_arrears'?: string
  'crs_add_channel_code'?: string
  'fss_extraction_date'?: string
  'fss_priority'?: string
  'fss_phaseout_year'?: string
  'fss_forecast'?: string
  'fss_forecast_year'?: string
  'fss_forecast_value_date'?: string
  'fss_forecast_currency'?: string
}
