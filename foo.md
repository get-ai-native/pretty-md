# Payment Service Refactor

A summary of changes made to the LRS payment flow.

## Overview

The `PaymentService` was refactored to handle **LRS compliance checks** before initiating any outward transfer. This affects all remittance flows above ₹50,000.

## What Changed

- Added `lrs_limit_check` before every outward remittance
- Integrated HDFC webhook verification using AES-256
- Fixed JWT expiry handling in `IciciClient`
- Removed deprecated `V1::TransferJob` in favour of `V2::RemittanceWorker`

## Code

```ruby
class PaymentService
  LRS_ANNUAL_LIMIT = 250_000 # USD

  def initiate_transfer(payload)
    raise LrsLimitExceeded if lrs_limit_exceeded?(payload[:amount])

    client = IciciClient.new
    client.post_encrypted(payload)
  end

  private

  def lrs_limit_exceeded?(amount)
    annual_usage + amount > LRS_ANNUAL_LIMIT
  end
end
```

## API Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| pan | string | yes | 10 char alphanumeric |
| amount | decimal | yes | In USD |
| purpose_code | string | yes | RBI purpose code |
| beneficiary_id | uuid | yes | Must be pre-verified |

## Important

> The webhook secret rotation must happen before **April 30** or HDFC will reject all callbacks.

Refer to the [RBI LRS guidelines](https://rbi.org.in) for the full spec.

## Status

- [x] ICICI integration
- [x] HDFC webhook
- [ ] Axis fallback
- [ ] Load testing
