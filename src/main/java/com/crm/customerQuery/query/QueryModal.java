package com.crm.customerQuery.query;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryModal {
    Long id;

Long newCustomer_id;
String projectName;
String discussion;
LocalDateTime call_date;
String deal_status;
LocalDateTime next_followup;
LocalDateTime created_at;
LocalDateTime updated_at;
}
