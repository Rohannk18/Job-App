from django.conf import settings
from django.db import models


class Application(models.Model):
    STATUS_APPLIED = "APPLIED"
    STATUS_REJECTED = "REJECTED"
    STATUS_SELECTED = "SELECTED"
    STATUS_CHOICES = [
        (STATUS_APPLIED, "Applied"),
        (STATUS_REJECTED, "Rejected"),
        (STATUS_SELECTED, "Selected"),
    ]

    job = models.ForeignKey("jobs.Job", on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications")
    resume = models.ForeignKey("accounts.Resume", on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_APPLIED)
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("job", "applicant")
