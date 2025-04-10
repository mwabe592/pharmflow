type EmailTemplateProps = {
  firstName: string;
  lastName: string;
  accreditations: {
    serviceName: string | undefined;
    expiryDate: string;
  }[];
};

export const EmailTemplate = ({
  firstName,
  lastName,
  accreditations,
}: EmailTemplateProps) => (
  <div>
    <p>
      Dear {firstName} {lastName}, your accreditations are expiring soon!!.
    </p>
    <p>
      The following accreditations are expiring in the next 7 days:
      <ul>
        {accreditations.map((accreditation, index) => (
          <li key={index}>
            {accreditation.serviceName} - Expiring on:
            {`${accreditation.expiryDate}`}
          </li>
        ))}
      </ul>
    </p>
    <p>Please renew them promptly. Thank you.</p>
  </div>
);
