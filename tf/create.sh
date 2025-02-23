#!/bin/bash

# 스크립트 시작
set -e

# 사용자 입력 받기
read -p "IAM 사용자명의  prefix를 입력하세요: " PREFIX
read -p "생성할 사용자 수를 입력하세요: " USER_COUNT
read -p "비밀번호 길이를 입력하세요: " PASSWORD_LENGTH

# 입력값 확인
echo "입력된 값:"
echo "prefix: $PREFIX"
echo "사용자 수: $USER_COUNT"
echo "비밀번호 길이: $PASSWORD_LENGTH"

# 임시 tfvars 파일 생성
TFVARS_FILE="generated.tfvars"
cat > $TFVARS_FILE <<EOL
prefix = "$PREFIX"
user_count = $USER_COUNT
password_length = $PASSWORD_LENGTH
EOL

echo "$TFVARS_FILE 파일이 생성되었습니다."
cat $TFVARS_FILE

# Terraform 초기화
echo "Terraform 초기화 중..."
terraform init

# Terraform Plan 실행
PLAN_OUTPUT="tfplan"
echo "Terraform Plan 실행 중..."
terraform plan -var-file=$TFVARS_FILE -out=$PLAN_OUTPUT

# Terraform Apply 실행
echo "Terraform Apply 실행 중..."
terraform apply -auto-approve $PLAN_OUTPUT

# 결과물 JSON으로 추출
OUTPUT_JSON="output.json"
echo "Terraform 결과물을 JSON으로 추출 중..."
terraform output -json > $OUTPUT_JSON

echo "Terraform 작업이 완료되었습니다."
echo "결과물이 $OUTPUT_JSON 파일에 저장되었습니다."

# Cleanup
echo "임시 tfvars 파일 삭제 중..."
rm -f $TFVARS_FILE

