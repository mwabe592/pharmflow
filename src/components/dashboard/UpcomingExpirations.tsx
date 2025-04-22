"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, ChevronRight, AlertCircle } from "lucide-react";

type UpcomingExpirationsProps = {
  data: {
    expiryDate: string;
    daysUntilExpiry: number;
    serviceName: string | null;
    staffName: string;
  }[];
};

export function UpcomingExpirations({ data }: UpcomingExpirationsProps) {
  const [expanded, setExpanded] = useState(false);

  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  );

  const displayData = expanded ? sortedData : sortedData.slice(0, 3);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            <CalendarClock className="mr-2 h-5 w-5 text-muted-foreground" />
            Upcoming Accreditation Expirations
          </CardTitle>
          <Badge variant="outline" className="ml-2">
            {data.length} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayData.map((item, index) => {
            const daysUntil = item.daysUntilExpiry;
            const isUrgent = daysUntil <= 7;

            return (
              <div
                key={`${item.serviceName}-${index}`}
                className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.serviceName}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.staffName}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-2">
                    <p
                      className={`text-sm font-medium ${
                        isUrgent ? "text-red-500" : ""
                      }`}
                    >
                      {item.expiryDate}
                    </p>
                    <p
                      className={`text-xs ${
                        isUrgent
                          ? "text-red-500 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {daysUntil === 0
                        ? "Expires today"
                        : daysUntil < 0
                          ? "Expired"
                          : `${daysUntil} day${daysUntil === 1 ? "" : "s"} left`}
                    </p>
                  </div>
                  {isUrgent && <AlertCircle className="h-4 w-4 text-red-500" />}
                </div>
              </div>
            );
          })}

          {data.length > 3 && (
            <Button
              variant="ghost"
              className="w-full text-xs h-8 mt-1"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : `Show ${data.length - 3} more`}
              <ChevronRight
                className={`h-4 w-4 ml-1 transition-transform ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
