from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import EmployerVerification, JobReport
from .serializers import EmployerVerificationSerializer, JobReportSerializer


class JobReportViewSet(viewsets.ModelViewSet):
    serializer_class = JobReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobReport.objects.all()

    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)


class EmployerVerificationViewSet(viewsets.ModelViewSet):
    serializer_class = EmployerVerificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EmployerVerification.objects.all()
